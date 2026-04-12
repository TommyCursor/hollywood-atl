"use client";
import Sidebar from "./Sidebar";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#07071A" }}>
      <Sidebar />
      <main style={{ marginLeft: 228, flex: 1, padding: 32 }}>
        {children}
      </main>
    </div>
  );
}
