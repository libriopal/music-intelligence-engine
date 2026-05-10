import { useRef } from "react";

export default function UploadPanel() {
  const workerRef = useRef<Worker | null>(null);
  const initWorker = () => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../workers/audio.worker.ts", import.meta.url),
        { type: "module" }
      );

      workerRef.current.onmessage = (e) => {
        console.log("Worker Response:", e.data);
      };
    }
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    initWorker();

    const file = e.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    workerRef.current?.postMessage(
      {
        type: "PROCESS_AUDIO",
        payload: arrayBuffer,
      },
      [arrayBuffer]
    );
  };

  return (
    <div>
      <input
        type="file"
        accept=".mp3,audio/mpeg"
        onChange={handleUpload}
      />
    </div>
  );
}
