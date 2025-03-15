import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Camera, X } from "lucide-react";

interface QRCodeScannerProps {
  onScan: (result: string) => void;
}

export function QRCodeScanner({ onScan }: QRCodeScannerProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrame: number;

    async function setupCamera() {
      try {
        if (!videoRef.current || !canvasRef.current) return;

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        setScanning(true);
        scanQRCode();
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Não foi possível acessar a câmera. Verifique as permissões.");
      }
    }

    function scanQRCode() {
      if (!videoRef.current || !canvasRef.current || !scanning) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      const video = videoRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Here you would normally use a QR code detection library
      // For this example, we'll simulate finding a QR code after a few seconds
      // In a real implementation, replace this with actual QR code detection

      animationFrame = requestAnimationFrame(scanQRCode);
    }

    if (open) {
      setupCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      setScanning(false);
    };
  }, [open, scanning, onScan]);

  // Simulate a successful scan after 3 seconds (for demo purposes)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open && scanning) {
      timeout = setTimeout(() => {
        // Simulate finding a QR code
        const mockQrValue = "https://ubpct.org.br/validate/123";
        onScan(mockQrValue);
        setOpen(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [open, scanning, onScan]);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Camera className="h-4 w-4" />
        Escanear QR Code
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Escanear QR Code</DialogTitle>
          </DialogHeader>

          <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-muted-foreground">
                {error}
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  playsInline
                  muted
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 h-full w-full object-cover opacity-0"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-48 w-48 border-2 border-primary rounded-lg" />
                </div>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
