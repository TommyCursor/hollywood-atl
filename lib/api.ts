import { createClient } from "@/lib/supabase";

const BASE = "http://localhost:4000/api";

async function authHeaders(): Promise<HeadersInit> {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  } catch {
    return { "Content-Type": "application/json" };
  }
}

export async function get(path: string) {
  const res = await fetch(`${BASE}${path}`, { headers: await authHeaders(), cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function post(path: string, body: object) {
  const res = await fetch(`${BASE}${path}`, { method: "POST", headers: await authHeaders(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

export async function patch(path: string, body?: object) {
  const res = await fetch(`${BASE}${path}`, { method: "PATCH", headers: await authHeaders(), body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error(`PATCH ${path} failed: ${res.status}`);
  return res.json();
}

export async function del(path: string) {
  const res = await fetch(`${BASE}${path}`, { method: "DELETE", headers: await authHeaders() });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  return res.json();
}
