"use client";

import { useEffect, useState } from "react";

/**
 * Defer loading of the heavy WebGL cloud scene until the page is idle. The
 * container is not rendered until the scene is ready, keeping the initial LCP
 * dominated by the hero section rather than the canvas.
 */
export default function ImmersiveCloudVisualization() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [Scene, setScene] = useState<React.ComponentType | null>(null);

  // Trigger loading when the browser is idle to avoid blocking important work
  useEffect(() => {
    const start = () => setShouldLoad(true);

    if (typeof (window as any).requestIdleCallback === "function") {
      const id = (window as any).requestIdleCallback(start, { timeout: 3000 });
      return () => (window as any).cancelIdleCallback?.(id);
    }

    const t = setTimeout(start, 3000);
    return () => clearTimeout(t);
  }, []);

  // Dynamically import the scene once loading has been triggered
  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    import("./CloudSceneImpl").then(m => {
      if (!cancelled) setScene(() => m.default);
    });
    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  if (!shouldLoad || !Scene) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Scene />
    </div>
  );
}
