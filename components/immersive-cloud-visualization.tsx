'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface ImmersiveCloudVisualizationProps {
  className?: string;
}

export default function ImmersiveCloudVisualization({ className = '' }: ImmersiveCloudVisualizationProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cloudRef = useRef<THREE.Points>();
  const animationIdRef = useRef<number>();
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const [isLoaded, setIsLoaded] = useState(false);

  const PARTICLE_COUNT = 30000;

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 50);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    return { scene, camera, renderer };
  }, []);

  // Create cloud particle system
  const createCloudSystem = useCallback((scene: THREE.Scene) => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const randomValues = new Float32Array(PARTICLE_COUNT * 3); // For random lighting
    
    // Generate cloud-shaped particle distribution - MUCH LESS concentrated at center
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Use inverse exponential distribution for LESS center concentration
      const spreadBias = Math.pow(Math.random(), 0.1); // Much lower power = more spread out
      const radius = spreadBias * 25 + Math.random() * 15; // Larger base radius
      
      // Create more evenly distributed cloud formation
      const layer = Math.floor(Math.random() * 6); // More layers
      const layerRadius = radius * (0.6 + layer * 0.15); // More even layer distribution
      const height = (Math.random() - 0.5) * (8 - layer) * 1.5; // More height variation
      
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * layerRadius * (0.3 + Math.random() * 0.7); // More spread
      const z = Math.sin(angle) * layerRadius * (0.3 + Math.random() * 0.7); // More spread
      const y = height + Math.sin(x * 0.03) * 2.5 + Math.cos(z * 0.03) * 2.5; // More variation
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Random values for lighting effects
      randomValues[i * 3] = Math.random();
      randomValues[i * 3 + 1] = Math.random();
      randomValues[i * 3 + 2] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomValues, 3));

    // Enhanced shader material with gradient colors and lighting - NO BLUR
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
        
        // Improved noise function
        float noise(vec3 p) {
          return sin(p.x * 0.1 + uTime) * cos(p.y * 0.1 + uTime * 0.7) * sin(p.z * 0.1 + uTime * 0.5);
        }
        
        // Random lighting function
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
          
          // Gentler wave motion
          pos.x += sin(uTime * 0.3 + position.z * 0.008) * 2.0;
          pos.y += cos(uTime * 0.2 + position.x * 0.008) * 1.5;
          pos.z += sin(uTime * 0.25 + position.y * 0.008) * 1.8;
          
          // Subtle turbulence
          float n = noise(position * 0.03 + uTime * 0.15);
          pos += normalize(position) * n * 0.8;
          
          // Fine detail movement - reduced intensity
          pos.x += sin(uTime * 1.2 + position.y * 0.05) * 0.4;
          pos.y += cos(uTime * 0.9 + position.z * 0.05) * 0.3;
          
          // Gentle rotation
          float angle = uTime * 0.05;
          mat3 rotY = mat3(
            cos(angle), 0.0, sin(angle),
            0.0, 1.0, 0.0,
            -sin(angle), 0.0, cos(angle)
          );
          pos = rotY * pos;
          
          // Scroll effect
          pos *= 1.0 + uScroll * 0.3;

          // Gentle mouse bounce effect instead of black hole
          vec2 m = uMouse * 2.0;
          float dist = distance(pos.xy, m);
          float bounceRadius = 8.0;
          
          if(dist < bounceRadius) {
            // Gentle bounce with spring-like behavior
            float bounceStrength = (bounceRadius - dist) / bounceRadius;
            bounceStrength = smoothstep(0.0, 1.0, bounceStrength);
            
            // Create a gentle push away with some randomness
            vec2 bounceDir = normalize(pos.xy - m + vec2(aRandom.x - 0.5, aRandom.y - 0.5) * 0.5);
            pos.xy += bounceDir * bounceStrength * 2.5;
            
            // Add some vertical movement for more natural effect
            pos.z += sin(bounceStrength * 3.14159) * 1.5;
          }

          float d = length(position) / 30.0; // Adjusted for wider distribution
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          
          // Smaller, more varied particle sizes
          float baseSize = 60.0 * (1.0 - d * 0.5); // Less size reduction with distance
          float sizeVariation = sin(uTime * 2.0 + aRandom.x * 10.0) * 0.4 + 0.8;
          gl_PointSize = max(baseSize * sizeVariation, 8.0);
          
          // Gradient color system - less bright, more sophisticated
          float colorPhase = uTime * 0.3 + d * 3.0 + aRandom.x * 2.0;
          float colorMix = sin(colorPhase) * 0.5 + 0.5;
          
          // Sophisticated color palette - muted gradients
          vec3 color1 = vec3(0.2, 0.6, 0.8);  // Muted cyan
          vec3 color2 = vec3(0.6, 0.3, 0.7);  // Muted purple
          vec3 color3 = vec3(0.4, 0.7, 0.9);  // Light blue
          vec3 color4 = vec3(0.8, 0.4, 0.6);  // Muted pink
          
          // Multi-layer color mixing
          vec3 mixA = mix(color1, color2, colorMix);
          vec3 mixB = mix(color3, color4, sin(colorPhase * 1.3) * 0.5 + 0.5);
          vColor = mix(mixA, mixB, sin(colorPhase * 0.7 + aRandom.y * 3.0) * 0.5 + 0.5);
          
          // Random lighting effect
          vBrightness = randomLighting(pos, aRandom) * 0.6 + 0.3; // Reduced brightness range
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
          // Sharp circular particles - NO BLUR
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          // Sharp falloff - no blur
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          
          // Sharp core brightness
          float core = 1.0 - smoothstep(0.0, 0.2, dist);
          alpha += core * 0.5;
          
          // Distance-based opacity with better falloff for wider distribution
          float distanceFade = 1.0 - smoothstep(15.0, 50.0, vDistance); // Adjusted for wider spread
          distanceFade = max(distanceFade, 0.05);
          
          // Gentle pulsing with random variation
          float pulse = sin(uTime * 1.5 + vDistance * 0.05 + vRandom.z * 5.0) * 0.2 + 0.8;
          
          // Apply random lighting
          vec3 finalColor = vColor * vBrightness;
          
          // Reduced overall opacity for subtlety
          float finalAlpha = alpha * distanceFade * pulse * 0.1;
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `
    });

    const cloud = new THREE.Points(geometry, material);
    cloudRef.current = cloud;
    scene.add(cloud);

    return cloud;
  }, [PARTICLE_COUNT]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Handle scroll
  const handleScroll = useCallback(() => {
    if (!cloudRef.current) return;
    
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / (maxScroll * 0.3), 1);
    
    if (cloudRef.current.material instanceof THREE.ShaderMaterial) {
      cloudRef.current.material.uniforms.uScroll.value = scrollProgress;
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !cloudRef.current) {
      return;
    }

    const time = Date.now() * 0.001;
    
    // Update shader uniforms
    if (cloudRef.current.material instanceof THREE.ShaderMaterial) {
      cloudRef.current.material.uniforms.uTime.value = time;
      cloudRef.current.material.uniforms.uMouse.value = mouseRef.current;
    }

    // QUICKER camera movement (increased speed)
    cameraRef.current.position.x = Math.sin(time * 0.15) * 4; // 3x faster
    cameraRef.current.position.y = Math.cos(time * 0.12) * 3; // 4x faster
    cameraRef.current.position.z = 50 + Math.sin(time * 0.08) * 6; // 4x faster
    cameraRef.current.lookAt(0, 0, 0);

    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);

  // Initialize and cleanup
  useEffect(() => {
    const sceneData = initScene();
    if (!sceneData) return;

    const cloudSystem = createCloudSystem(sceneData.scene);
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();
    setIsLoaded(true);

    return () => {
      // Cleanup
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose of Three.js resources
      if (cloudSystem) {
        cloudSystem.geometry.dispose();
        if (cloudSystem.material instanceof THREE.Material) {
          cloudSystem.material.dispose();
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mountRef.current && rendererRef.current.domElement) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [initScene, createCloudSystem, handleMouseMove, handleScroll, handleResize, animate]);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 z-0 ${className}`}
      style={{ 
        width: '100vw', 
        height: '1000vh',
        overflow: 'hidden'
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-neon text-sm animate-pulse">Loading immersive cloud...</div>
        </div>
      )}
    </div>
  );
}