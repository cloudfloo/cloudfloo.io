'use client';

import { useRef, useEffect, useState } from 'react';

interface ImmersiveCloudVisualizationProps {
  className?: string;
}

export default function ImmersiveCloudVisualization({ className = '' }: ImmersiveCloudVisualizationProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>();
  const workerRef = useRef<Worker>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    mountNode.appendChild(canvas);
    canvasRef.current = canvas;

    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker(new URL('./cloud-worker.ts', import.meta.url), { type: 'module' });
    workerRef.current = worker;
    worker.postMessage(
      { type: 'init', canvas: offscreen, width: window.innerWidth, height: window.innerHeight },
      [offscreen]
    );

    const handleResize = () => {
      worker.postMessage({ type: 'resize', width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 6 - 1;
      const y = -(event.clientY / window.innerHeight) * 6 + 1;
      worker.postMessage({ type: 'mouse', x, y });
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = docHeight > 0 ? scrollTop / docHeight : 0;
      worker.postMessage({ type: 'scroll', value: scrollRatio });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    setIsLoaded(true);

    return () => {
      worker.postMessage({ type: 'dispose' });
      worker.terminate();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (canvasRef.current && mountNode) {
        mountNode.removeChild(canvasRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 z-0 ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
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
