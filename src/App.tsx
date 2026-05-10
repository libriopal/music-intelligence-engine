import UploadPanel from "./ui/UploadPanel";

export default function App() {
  return (
    <div
      style={{
        background: "#020617",
        color: "#10b981",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "monospace",
      }}
    >
      <h1>STRUTHIO MUSIC CORE</h1>

      <UploadPanel />
    </div>
  );
}
