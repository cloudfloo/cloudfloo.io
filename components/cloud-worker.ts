import * as THREE from 'three';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer | undefined;
let cloud: THREE.Points | undefined;
let mouse = new THREE.Vector2();
let animationId: number;

const PARTICLE_COUNT = 30000;

// Creating thousands of particles at once can block the worker event loop for
// noticeable time. We generate them in chunks during idle periods to keep the
// UI responsive.
async function createCloudSystem(): Promise<THREE.Points> {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const randomValues = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const spreadBias = Math.pow(Math.random(), 0.1);
    const radius = spreadBias * 25 + Math.random() * 15;
    const layer = Math.floor(Math.random() * 6);
    const layerRadius = radius * (0.6 + layer * 0.15);
    const height = (Math.random() - 0.5) * (8 - layer) * 1.5;

    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * layerRadius * (0.3 + Math.random() * 0.7);
    const z = Math.sin(angle) * layerRadius * (0.3 + Math.random() * 0.7);
    const y = height + Math.sin(x * 0.03) * 2.5 + Math.cos(z * 0.03) * 2.5;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    randomValues[i * 3] = Math.random();
    randomValues[i * 3 + 1] = Math.random();
    randomValues[i * 3 + 2] = Math.random();

    // Yield every few thousand iterations so we don't block for >16ms
    if (i % 5000 === 0) {
      await new Promise(r => setTimeout(r, 50));
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomValues, 3));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uScroll: { value: 0 }
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;

      attribute vec3 aRandom;

      varying vec3 vPosition;
      varying float vDistance;
      varying vec3 vColor;
      varying float vBrightness;
      varying vec3 vRandom;

      float noise(vec3 p) {
        return sin(p.x * 0.1 + uTime) * cos(p.y * 0.1 + uTime * 0.7) * sin(p.z * 0.1 + uTime * 0.5);
      }

      float randomLighting(vec3 pos, vec3 random) {
        float light1 = sin(uTime * 1.5 + random.x * 10.0 + pos.x * 0.1) * 0.5 + 0.5;
        float light2 = cos(uTime * 2.0 + random.y * 8.0 + pos.y * 0.1) * 0.3 + 0.7;
        float light3 = sin(uTime * 0.8 + random.z * 12.0 + pos.z * 0.1) * 0.4 + 0.6;
        return light1 * light2 * light3;
      }

      void main() {
        vPosition = position;
        vDistance = length(position);
        vRandom = aRandom;

        vec3 pos = position;

        pos.x += sin(uTime * 0.3 + position.z * 0.008) * 2.0;
        pos.y += cos(uTime * 0.2 + position.x * 0.008) * 1.5;
        pos.z += sin(uTime * 0.25 + position.y * 0.008) * 1.8;

        float n = noise(position * 0.03 + uTime * 0.15);
        pos += normalize(position) * n * 0.8;

        pos.x += sin(uTime * 1.2 + position.y * 0.05) * 0.4;
        pos.y += cos(uTime * 0.9 + position.z * 0.05) * 0.3;

        float angle = uTime * 0.05;
        mat3 rotY = mat3(
          cos(angle), 0.0, sin(angle),
          0.0, 1.0, 0.0,
          -sin(angle), 0.0, cos(angle)
        );
        pos = rotY * pos;

        pos *= 1.0 + uScroll * 0.3;

        vec2 m = uMouse * 2.0;
        float dist = distance(pos.xy, m);
        float bounceRadius = 8.0;

        if(dist < bounceRadius) {
          float bounceStrength = (bounceRadius - dist) / bounceRadius;
          bounceStrength = smoothstep(0.0, 1.0, bounceStrength);
          vec2 bounceDir = normalize(pos.xy - m + vec2(aRandom.x - 0.5, aRandom.y - 0.5) * 0.5);
          pos.xy += bounceDir * bounceStrength * 2.5;
          pos.z += sin(bounceStrength * 3.14159) * 1.5;
        }

        float d = length(position) / 30.0;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

        float baseSize = 60.0 * (1.0 - d * 0.5);
        float sizeVariation = sin(uTime * 2.0 + aRandom.x * 10.0) * 0.4 + 0.8;
        gl_PointSize = max(baseSize * sizeVariation, 8.0);

        float colorPhase = uTime * 0.3 + d * 3.0 + aRandom.x * 2.0;
        float colorMix = sin(colorPhase) * 0.5 + 0.5;

        vec3 color1 = vec3(0.2, 0.6, 0.8);
        vec3 color2 = vec3(0.6, 0.3, 0.7);
        vec3 color3 = vec3(0.4, 0.7, 0.9);
        vec3 color4 = vec3(0.8, 0.4, 0.6);

        vec3 mixA = mix(color1, color2, colorMix);
        vec3 mixB = mix(color3, color4, sin(colorPhase * 1.3) * 0.5 + 0.5);
        vColor = mix(mixA, mixB, sin(colorPhase * 0.7 + aRandom.y * 3.0) * 0.5 + 0.5);

        vBrightness = randomLighting(pos, aRandom) * 0.6 + 0.3;
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      varying float vDistance;
      varying vec3 vColor;
      varying float vBrightness;
      varying vec3 vRandom;
      uniform float uTime;

      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;

        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

        float core = 1.0 - smoothstep(0.0, 0.2, dist);
        alpha += core * 0.5;

        float distanceFade = 1.0 - smoothstep(15.0, 50.0, vDistance);
        distanceFade = max(distanceFade, 0.05);

        float pulse = sin(uTime * 1.5 + vDistance * 0.05 + vRandom.z * 5.0) * 0.2 + 0.8;

        vec3 finalColor = vColor * vBrightness;

        float finalAlpha = alpha * distanceFade * pulse * 0.1;

        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `
  });

  const cloud = new THREE.Points(geometry, material);
  return cloud;
}

function animate() {
  if (!scene || !camera || !renderer || !cloud) return;

  const time = Date.now() * 0.001;

  if ((cloud.material as THREE.ShaderMaterial).uniforms) {
    (cloud.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
    (cloud.material as THREE.ShaderMaterial).uniforms.uMouse.value = mouse;
  }

  camera.position.x = Math.sin(time * 0.15) * 8;
  camera.position.y = Math.cos(time * 0.12) * 6;
  camera.position.z = 50 + Math.sin(time * 0.08) * 4;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

async function init(canvas: OffscreenCanvas | undefined, width: number, height: number) {
  if (!canvas) {
    if (typeof (self as any).OffscreenCanvas === 'function') {
      try {
        canvas = new (self as any).OffscreenCanvas(width, height);
      } catch (err) {
        console.error('Failed to create fallback OffscreenCanvas', err);
        return;
      }
    } else {
      console.error('Worker init called without an OffscreenCanvas');
      return;
    }
  }

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
  camera.position.set(0, 0, 50);

  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    if (renderer.domElement) {
      const hasStyle = (renderer.domElement as any).style !== undefined;
      renderer.setSize(width, height, hasStyle);
      renderer.setPixelRatio(Math.min((self as any).devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
    } else {
      console.error('WebGLRenderer created without a canvas');
      renderer = undefined;
      return;
    }
  } catch (err) {
    console.error('Failed to create WebGLRenderer', err);
    renderer = undefined;
    return;
  }

  cloud = await createCloudSystem();
  scene.add(cloud);

  animate();
}

function resize(width: number, height: number) {
  if (!camera || !renderer) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  if (renderer && (renderer as any).domElement) {
    const hasStyle = (renderer.domElement as any).style !== undefined;
    renderer.setSize(width, height, hasStyle);
  }
}

function dispose() {
  cancelAnimationFrame(animationId);
  if (cloud) {
    cloud.geometry.dispose();
    if (cloud.material instanceof THREE.Material) {
      cloud.material.dispose();
    }
    cloud = undefined;
  }
  if (renderer) {
    renderer.dispose();
    renderer = undefined;
  }
}

self.onmessage = (event: MessageEvent) => {
  const data = event.data;
  switch (data.type) {
    case 'init':
      init(data.canvas, data.width, data.height);
      break;
    case 'resize':
      resize(data.width, data.height);
      break;
    case 'mouse':
      mouse.x = data.x;
      mouse.y = data.y;
      break;
    case 'dispose':
      dispose();
      break;
  }
};

// Export functions for unit testing
export { init, resize, dispose };
