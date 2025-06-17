'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface CloudVisualizationProps {
  className?: string;
}

export default function CloudVisualization({ className = '' }: CloudVisualizationProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cloudRef = useRef<THREE.Points>();
  const animationIdRef = useRef<number>();
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Cloud parameters
  const PARTICLE_COUNT = isMobile ? 15000 : 45000;
  const CLOUD_RADIUS = 10;

  // Detect mobile devices for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simple noise function
  const noise = useCallback((x: number, y: number, z: number) => {
    return (
      Math.sin(x * 0.1) * Math.cos(y * 0.1) * Math.sin(z * 0.1) +
      Math.sin(x * 0.2) * Math.cos(y * 0.15) * Math.sin(z * 0.2) * 0.5 +
      Math.sin(x * 0.4) * Math.cos(y * 0.3) * Math.sin(z * 0.4) * 0.25
    ) / 1.75;
  }, []);

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xFF0000, 10, 50);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    return { scene, camera, renderer };
  }, [isMobile]);

  // Create cloud particle system
  const createCloudSystem = useCallback((scene: THREE.Scene) => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = Math.cbrt(Math.random()) * CLOUD_RADIUS;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);

      const noiseValue = noise(x * 0.5, y * 0.5, z * 0.5);
      const density = Math.max(0, noiseValue + 0.3);

      if (Math.random() > density) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * CLOUD_RADIUS * 0.7;
        x = Math.cos(angle) * radius;
        y = (Math.random() - 0.5) * CLOUD_RADIUS * 0.4;
        z = Math.sin(angle) * radius;
      }

      y *= 0.6;

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3]     = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:    { value: 0 },
        uScatter: { value: 0 },
        uHover:   { value: 0 },
        uMouse:   { value: new THREE.Vector2() }
      },
      vertexShader: `
        attribute vec3 originalPosition;
        varying vec3 vPos;
        varying float vDistance;
        uniform float uTime;
        uniform float uScatter;
        uniform float uHover;
        uniform vec2 uMouse;

        float noise(vec3 p) {
          return sin(p.x * 0.1) * cos(p.y * 0.1) * sin(p.z * 0.1) +
                 sin(p.x * 0.2) * cos(p.y * 0.15) * sin(p.z * 0.2) * 0.5 +
                 sin(p.x * 0.4) * cos(p.y * 0.3) * sin(p.z * 0.4) * 0.25;
        }

        void main() {
          vPos = originalPosition;
          vDistance = length(originalPosition);

          vec3 noisePos = originalPosition + uTime * 0.02;
          float n = noise(noisePos * 0.5);
          vec3 displaced = originalPosition + normalize(originalPosition) * n * 0.3;

          float angle = uTime * 0.1;
          mat3 rotY = mat3(
            cos(angle), 0.0, sin(angle),
            0.0,       1.0, 0.0,
            -sin(angle),0.0, cos(angle)
          );
          displaced = rotY * displaced;

          displaced.y += sin(uTime * 0.3 + originalPosition.x * 0.1) * 0.2;
          displaced.x += cos(uTime * 0.2 + originalPosition.z * 0.1) * 0.1;
          displaced.z += sin(uTime * 0.25 + originalPosition.y * 0.1) * 0.15;

          vec3 mouseInfluence = vec3(uMouse.x * 10.0, uMouse.y * 5.0, 0.0);
          float md = distance(displaced.xy, mouseInfluence.xy);
          if (md < 3.0) {
            vec3 rep = normalize(displaced - mouseInfluence) * (3.0 - md) * 0.5;
            displaced += rep * uHover;
          }

          displaced += normalize(originalPosition) * uScatter * vDistance;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);

          float size = 120.0 * (1.0 - vDistance / ${CLOUD_RADIUS}.0);
          size *= (1.0 + n * 0.5);
          gl_PointSize = size;
        }
      `,
      fragmentShader: `
        varying vec3 vPos;
        varying float vDistance;
        uniform float uTime;
        uniform float uScatter;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          // crisper mask
          if (dist > 0.4) discard;
          // tighter falloff
          float alpha = 1.0 - (dist * 1.8);
          alpha = smoothstep(0.0, 1.0, alpha);

          float density = 1.0 - (vDistance / ${CLOUD_RADIUS}.0);
          density = smoothstep(0.0, 1.0, density);

          float variation = sin(vPos.x * 0.1 + uTime * 0.5) * 0.3 + 0.7;

          vec3 color = mix(vec3(1.0), vec3(0.8, 0.9, 1.0), density * 0.3);
          color += vec3(0.0, 0.1, 0.2) * sin(uTime * 0.3 + vPos.y * 0.1) * 0.2;
          color += vec3(0.2, 0.0, 0.1) * cos(uTime * 0.4 + vPos.x * 0.1) * 0.1;

          gl_FragColor = vec4(color, alpha * density * variation * 0.6);
        }
      `
    });

    const cloud = new THREE.Points(geometry, material);
    cloudRef.current = cloud;
    scene.add(cloud);
    return cloud;
  }, [noise, PARTICLE_COUNT, CLOUD_RADIUS, isMobile]);

  // Mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!mountRef.current) return;
    const r = mountRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  }, []);

  // Updated scroll handler for full-page expand
  const handleScroll = useCallback(() => {
    if (!cloudRef.current) return;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    if (cloudRef.current.material instanceof THREE.ShaderMaterial) {
      cloudRef.current.material.uniforms.uScatter.value = scrollProgress;
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !cloudRef.current) return;

    const time = Date.now() * 0.001;

    if (cloudRef.current.material instanceof THREE.ShaderMaterial) {
      const u = cloudRef.current.material.uniforms;
      u.uTime.value = time;
      u.uMouse.value.copy(mouseRef.current);
      const hover = Math.min(
        Math.hypot(mouseRef.current.x, mouseRef.current.y),
        1.0
      );
      u.uHover.value = hover * 0.3;
    }

    cameraRef.current.position.x = Math.sin(time * 0.05) * 2;
    cameraRef.current.position.y = Math.cos(time * 0.03) * 1;
    cameraRef.current.lookAt(0, 0, 0);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Resize
  const handleResize = useCallback(() => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;
    cameraRef.current.aspect = w / h;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(w, h);
  }, []);

  // Setup & cleanup
  useEffect(() => {
    const ctx = initScene();
    if (!ctx) return;
    const cloudSystem = createCloudSystem(ctx.scene);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    animate();
    setIsLoaded(true);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (cloudSystem) {
        cloudSystem.geometry.dispose();
        if (cloudSystem.material instanceof THREE.Material) cloudSystem.material.dispose();
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
      className={`relative w-full h-full gpu-accelerated ${className}`}
      style={{ minHeight: '400px' }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-neon text-sm animate-pulse">
            Loading cloud visualization...
          </div>
        </div>
      )}
    </div>
  );
}
