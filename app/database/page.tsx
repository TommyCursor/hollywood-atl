import Shell from "@/components/Shell";
import { createClient } from "@/lib/supabase-server";
import DatabaseClient from "@/components/pages/DatabaseClient";

async function getDatabase() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const res = await fetch("http://localhost:4000/api/database", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    if (!res.ok) return { sheets: [], data: {} };
    return res.json();
  } catch {
    return { sheets: [], data: {} };
  }
}

export default async function DatabasePage() {
  const database = await getDatabase();

  return (
    <Shell>
      <DatabaseClient database={database} />
    </Shell>
  );
}
