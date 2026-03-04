import { Box } from "lucide-react";

interface ModelViewerProps {
  modelUrl?: string;
  title: string;
}

export function ModelViewer({ modelUrl, title }: ModelViewerProps) {
  if (!modelUrl) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-secondary/20">
        <div className="text-center">
          <Box className="mx-auto mb-2 h-10 w-10 text-muted-foreground animate-float" />
          <p className="text-sm text-muted-foreground">3D Model coming soon</p>
          <p className="text-xs text-muted-foreground/60">Admin can add a model URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-secondary/20">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <Box className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">3D Model — {title}</span>
      </div>
      {/* @ts-ignore */}
      <model-viewer
        src={modelUrl}
        alt={`3D model for ${title}`}
        auto-rotate
        camera-controls
        shadow-intensity="1"
        style={{ width: "100%", height: "300px", background: "transparent" }}
      />
    </div>
  );
}
