import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Points,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  AdditiveBlending,
  Vector2,
  Vector3,
  Material
} from "three";

console.log('Cloud worker loaded with selective imports');

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer | undefined;
let cloud: Points | undefined;
let mouse = new Vector2();
let animationId: number;
let isVisible = true;
let performanceMetrics = {
  initTime: 0,
  frameCount: 0,
  avgFrameTime: 0
};

const nav = (self as any).navigator || {};
const hardware = nav.hardwareConcurrency ?? 8;
const memory = nav.deviceMemory ?? 8;
const config = {
  lowEndThresholds: { hardware: 4, memory: 4 },
  particleCounts: { lowEnd: 2000, highEnd: 5000 },
  frameIntervals: { lowEnd: 1000 / 24, highEnd: 1000 / 30 },
  progressiveLoadingRatio: 0.2
};

const isLowEnd =
  hardware <= config.lowEndThresholds.hardware ||
  memory <= config.lowEndThresholds.memory;
let PARTICLE_COUNT = isLowEnd
  ? config.particleCounts.lowEnd
  : config.particleCounts.highEnd;
const FRAME_INTERVAL = isLowEnd
  ? config.frameIntervals.lowEnd
  : config.frameIntervals.highEnd;
let lastFrame = 0;

console.log('Cloud worker config:', { isLowEnd, PARTICLE_COUNT, FRAME_INTERVAL });

function generateParticle(
  index: number, 
  positions: Float32Array, 
  randomValues: Float32Array
): void {
  const spreadBias = Math.pow(Math.random(), 0.1);
  const radius = spreadBias * 25 + Math.random() * 15;
  const layer = Math.floor(Math.random() * 6);
  const layerRadius = radius * (0.6 + layer * 0.15);
  const height = (Math.random() - 0.5) * (8 - layer) * 1.5;

  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * layerRadius * (0.3 + Math.random() * 0.7);
  const z = Math.sin(angle) * layerRadius * (0.3 + Math.random() * 0.7);
  const y = height + Math.sin(x * 0.03) * 2.5 + Math.cos(z * 0.03) * 2.5;

  positions[index * 3] = x;
  positions[index * 3 + 1] = y;
  positions[index * 3 + 2] = z;

  randomValues[index * 3] = Math.random();
  randomValues[index * 3 + 1] = Math.random();
  randomValues[index * 3 + 2] = Math.random();
}

async function createCloudSystem(): Promise<Points> {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const randomValues = new Float32Array(PARTICLE_COUNT * 3);
  
  const initialCount = Math.floor(PARTICLE_COUNT * config.progressiveLoadingRatio);
  
  for (let i = 0; i < initialCount; i++) {
    generateParticle(i, positions, randomValues);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aRandom", new BufferAttribute(randomValues, 3));

  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new Vector2() },
      uScroll: { value: 0 },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      attribute vec3 aRandom;
      
      varying vec3 vColor;
      varying float vAlpha;
      varying float vDistance;

      void main() {
        vec3 pos = position;
        vDistance = length(position);
        
        float angle = uTime * 0.05;
        pos.x = position.x * cos(angle) - position.z * sin(angle);
        pos.z = position.x * sin(angle) + position.z * cos(angle);
        
        pos.y += sin(uTime * 0.5 + position.x * 0.1) * 2.0;
        pos.x += cos(uTime * 0.3 + position.z * 0.1) * 1.0;
        
        pos *= 1.0 + uScroll * 0.2;
        
        vec2 mouseOffset = pos.xy - uMouse * 5.0;
        float mouseDist = length(mouseOffset);
        if(mouseDist < 8.0) {
          vec2 pushDir = normalize(mouseOffset + vec2(aRandom.x - 0.5, aRandom.y - 0.5) * 2.0);
          pos.xy += pushDir * (8.0 - mouseDist) * 0.5;
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        
        float distanceFactor = 1.0 - vDistance / 40.0;
        gl_PointSize = max(40.0 * distanceFactor * (0.8 + aRandom.z * 0.4), 8.0);
        
        float colorPhase = uTime * 0.2 + vDistance * 0.1 + aRandom.x;
        vColor = mix(
          vec3(0.2, 0.6, 0.8), 
          vec3(0.8, 0.4, 0.6), 
          sin(colorPhase) * 0.5 + 0.5
        );
        
        vAlpha = distanceFactor * 0.1;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      varying float vDistance;
      uniform float uTime;

      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;
        
        float alpha = (1.0 - dist * 2.0) * vAlpha;
        
        alpha *= 0.8 + sin(uTime + vDistance * 0.1) * 0.2;
        
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  });

  const cloudPoints = new Points(geometry, material);
  
  if (initialCount < PARTICLE_COUNT) {
    setTimeout(async () => {
      for (let i = initialCount; i < PARTICLE_COUNT; i++) {
        generateParticle(i, positions, randomValues);
        
        if (i % 500 === 0) {
          await new Promise(resolve => setTimeout(resolve, 16));
        }
      }
      
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.aRandom.needsUpdate = true;
      
      console.log('Progressive particle loading completed');
    }, 100);
  }

  return cloudPoints;
}

function animate(time: number = 0) {
  if (!scene || !camera || !renderer || !cloud || !isVisible) {
    if (isVisible) {
      animationId = requestAnimationFrame(animate);
    }
    return;
  }

  if (time - lastFrame < FRAME_INTERVAL * 1.5) {
    animationId = requestAnimationFrame(animate);
    return;
  }
  
  const frameStart = performance.now();
  lastFrame = time;
  const t = time * 0.001;

  if (performanceMetrics.frameCount % 2 === 0) {
    if ((cloud.material as ShaderMaterial).uniforms) {
      (cloud.material as ShaderMaterial).uniforms.uTime.value = t;
      (cloud.material as ShaderMaterial).uniforms.uMouse.value = mouse;
    }
  }

  camera.position.x = Math.sin(t * 0.1) * 5;
  camera.position.y = Math.cos(t * 0.08) * 3;
  camera.position.z = 50 + Math.sin(t * 0.05) * 3;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  
  const frameTime = performance.now() - frameStart;
  performanceMetrics.frameCount++;
  performanceMetrics.avgFrameTime = 
    (performanceMetrics.avgFrameTime * (performanceMetrics.frameCount - 1) + frameTime) / 
    performanceMetrics.frameCount;
  
  if (performanceMetrics.frameCount % 120 === 0 && performanceMetrics.avgFrameTime > 16) {
    console.warn('High frame time detected, consider reducing particles');
    self.postMessage({ 
      type: 'performance', 
      metric: 'highFrameTime', 
      value: performanceMetrics.avgFrameTime 
    });
  }
  
  animationId = requestAnimationFrame(animate);
}

async function init(
  canvas: OffscreenCanvas | undefined,
  width: number,
  height: number
) {
  const initStart = performance.now();
  console.log('Cloud worker init called with:', { canvas: !!canvas, width, height });
  
  if (!canvas) {
    if (typeof (self as any).OffscreenCanvas === "function") {
      try {
        canvas = new (self as any).OffscreenCanvas(width, height);
        console.log('Created fallback OffscreenCanvas');
      } catch (err) {
        console.error("Failed to create fallback OffscreenCanvas", err);
        return;
      }
    } else {
      console.error("Worker init called without an OffscreenCanvas");
      return;
    }
  }

  scene = new Scene();
  camera = new PerspectiveCamera(45, width / height, 0.1, 2000);
  camera.position.set(0, 0, 50);

  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: !isLowEnd,
      alpha: true,
      powerPreference: "high-performance",
    });
    
    if (renderer.domElement) {
      const hasStyle = (renderer.domElement as any).style !== undefined;
      renderer.setSize(width, height, hasStyle);
      const pixelRatio = isLowEnd ? 1 : Math.min((self as any).devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0);
    } else {
      console.error("WebGLRenderer created without a canvas");
      renderer = undefined;
      return;
    }
  } catch (err) {
    console.error("Failed to create WebGLRenderer", err);
    renderer = undefined;
    return;
  }

  console.log('Creating cloud system...');
  cloud = await createCloudSystem();
  scene.add(cloud);
  
  performanceMetrics.initTime = performance.now() - initStart;
  console.log('Cloud system created in', performanceMetrics.initTime, 'ms');
  
  if (performanceMetrics.initTime > 1000 && PARTICLE_COUNT > 1000) {
    console.warn('Slow init detected, reducing particle count for future instances');
    PARTICLE_COUNT = Math.max(1000, PARTICLE_COUNT * 0.7);
  }
  
  self.postMessage({ 
    type: 'performance', 
    metric: 'init', 
    value: performanceMetrics.initTime 
  });

  animate(0);
  console.log('Animation started');
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
    if (cloud.material instanceof Material) {
      cloud.material.dispose();
    }
    cloud = undefined;
  }
  if (renderer) {
    renderer.dispose();
    renderer = undefined;
  }
  performanceMetrics = { initTime: 0, frameCount: 0, avgFrameTime: 0 };
}

self.onmessage = (event: MessageEvent) => {
  const data = event.data;
  console.log('Cloud worker received message:', data.type);
  
  switch (data.type) {
    case "init":
      init(data.canvas, data.width, data.height);
      break;
    case "resize":
      resize(data.width, data.height);
      break;
    case "mouse":
      mouse.x = data.x;
      mouse.y = data.y;
      break;
    case "scroll":
      if (cloud && (cloud.material as ShaderMaterial).uniforms) {
        (cloud.material as ShaderMaterial).uniforms.uScroll.value = data.value;
      }
      break;
    case "visibility":
      isVisible = data.visible;
      if (!isVisible) {
        cancelAnimationFrame(animationId);
        console.log('Animation paused - not visible');
      } else if (scene && camera && renderer && cloud) {
        animate();
        console.log('Animation resumed - visible');
      }
      break;
    case "dispose":
      dispose();
      break;
  }
};

export { init, resize, dispose };
