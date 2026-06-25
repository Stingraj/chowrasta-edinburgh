import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import config from "../../sanity.config";

export const Route = createFileRoute("/studio")({
  component: StudioRoute,
});

function StudioRoute() {
  const [StudioComponent, setStudioComponent] = useState<any>(null);

  useEffect(() => {
    // Dynamically load the Sanity Studio component on the client only
    // to avoid node SSR compilation/runtime errors with browser-only APIs
    import("sanity")
      .then((mod) => {
        setStudioComponent(() => mod.Studio);
      })
      .catch((err) => {
        console.error("Failed to load Sanity Studio package:", err);
      });
  }, []);

  if (!StudioComponent) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-heritage-deep text-cream font-sans">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm tracking-widest uppercase text-gold">Loading Sanity Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative z-[99999]">
      <StudioComponent config={config} />
    </div>
  );
}
