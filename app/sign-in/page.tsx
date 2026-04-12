"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#07071A",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 32,
    }}>
      <div style={{ textAlign: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Hollywood ATL"
          style={{ width: 180, height: 180, objectFit: "contain", borderRadius: 16, margin: "0 auto 12px", display: "block" }}
        />
        <div style={{ color: "#666", fontSize: 13, marginTop: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>
          Financial Operations System
        </div>
      </div>

      <form onSubmit={handleSignIn} style={{
        background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 12,
        padding: "32px 36px", width: 360, display: "flex", flexDirection: "column", gap: 16,
      }}>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0, textAlign: "center" }}>Sign In</h2>

        {error && (
          <div style={{ background: "#F4433620", border: "1px solid #F4433640", borderRadius: 6, padding: "10px 14px", color: "#F44336", fontSize: 13 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ color: "#888", fontSize: 12 }}>Email</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            required autoComplete="email"
            style={{
              background: "#090918", border: "1px solid #2a2a2a", borderRadius: 6,
              padding: "10px 12px", color: "#fff", fontSize: 14, outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ color: "#888", fontSize: 12 }}>Password</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            required autoComplete="current-password"
            style={{
              background: "#090918", border: "1px solid #2a2a2a", borderRadius: 6,
              padding: "10px 12px", color: "#fff", fontSize: 14, outline: "none",
            }}
          />
        </div>

        <button type="submit" disabled={loading} style={{
          background: "#8B5CF6", color: "#000", fontWeight: "bold",
          border: "none", borderRadius: 6, padding: "12px", fontSize: 14,
          cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: 4,
        }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div style={{ textAlign: "center", color: "#555", fontSize: 13 }}>
          Don&apos;t have an account?{" "}
          <a href="/sign-up" style={{ color: "#8B5CF6", textDecoration: "none" }}>Sign up</a>
        </div>
      </form>
    </div>
  );
}
