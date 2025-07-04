"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lazily load the heavy cloud visualization only when the container becomes
 * visible in the viewport. This keeps the initial bundle small and avoids
 * blocking the main thread during first paint.
 */
export default function ImmersiveCloudVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const load = () => import("./CloudSceneImpl").then(m => setScene(() => m.default));

    if ("IntersectionObserver" in window && containerRef.current) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          load();
          observer.disconnect();
        }
      }, { rootMargin: "200px" });

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }

    const id = setTimeout(load, 2000);
    return () => clearTimeout(id);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0">{Scene && <Scene />}</div>;
}
