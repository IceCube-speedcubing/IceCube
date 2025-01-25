'use client';

export default function Page() {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <div className="flex-1 w-full max-w-xl flex flex-col items-center justify-center">
          <a href="/timer" className="rounded-lg border bg-card p-3 w-full hover:bg-muted/50">
            <p className="text-lg font-mono text-center">Timer</p>
          </a>
        </div>
      </div>
    </div>
  );
}
