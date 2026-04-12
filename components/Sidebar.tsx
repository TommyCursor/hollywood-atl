"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

const NAV = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard",       href: "/dashboard",       icon: "▣",  roles: ["Owner", "GM", "PayrollAdmin", "Promoter"] },
      { label: "Financial Daily", href: "/financial-daily", icon: "📊", roles: ["Owner", "GM", "PayrollAdmin"] },
      { label: "Cash Flow",       href: "/cash-flow",       icon: "💵", roles: ["Owner", "GM"] },
    ],
  },
  {
    section: "Events",
    items: [
      { label: "Calendar",        href: "/calendar",        icon: "📅", roles: ["Owner", "GM", "PayrollAdmin", "Promoter"] },
      { label: "Events",          href: "/events",          icon: "🎵", roles: ["Owner", "GM", "PayrollAdmin", "Promoter"] },
      { label: "Promoters",       href: "/promoters",       icon: "🎤", roles: ["Owner", "GM", "Promoter"] },
      { label: "Leads",           href: "/leads",           icon: "📋", roles: ["Owner", "GM"] },
    ],
  },
  {
    section: "People",
    items: [
      { label: "Employees",       href: "/employees",       icon: "👥", roles: ["Owner", "GM", "PayrollAdmin"] },
      { label: "Schedule",        href: "/schedule",        icon: "📆", roles: ["Owner", "GM", "PayrollAdmin"] },
      { label: "Payroll",         href: "/payroll",         icon: "💰", roles: ["Owner", "GM", "PayrollAdmin"] },
      { label: "Distributions",   href: "/distributions",   icon: "💳", roles: ["Owner", "GM", "PayrollAdmin"] },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Expenses",        href: "/expenses",        icon: "🧾", roles: ["Owner", "GM"] },
      { label: "Profit Sharing",  href: "/profit-sharing",  icon: "◎",  roles: ["Owner"] },
      { label: "POS Import",      href: "/pos-import",      icon: "⬆",  roles: ["Owner", "GM"] },
    ],
  },
  {
    section: "Admin",
    items: [
      { label: "Users",           href: "/users",           icon: "🔐", roles: ["Owner"] },
    ],
  },
];

const roleColors: Record<string, string> = {
  Owner: "#8B5CF6", GM: "#3B82F6", PayrollAdmin: "#4CAF50", Promoter: "#A855F7",
};
const roleLabels: Record<string, string> = {
  Owner: "Owner", GM: "General Manager", PayrollAdmin: "Payroll Admin", Promoter: "Promoter",
};

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  const role = (user?.user_metadata?.role as string) || "Owner";
  const color = roleColors[role] || "#8B5CF6";
  const fullName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";

  return (
    <aside style={{
      width: 228, height: "100vh", background: "#090918",
      borderRight: "1px solid #222", display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, zIndex: 10, overflow: "hidden",
    }}>
      <div style={{ padding: "16px 18px 14px", borderBottom: "1px solid #222" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Hollywood ATL"
            style={{ width: 130, height: 130, objectFit: "contain", borderRadius: 8 }}
          />
          <div style={{ color: "#555", fontSize: 10, letterSpacing: 0.5, textTransform: "uppercase" }}>
            Financial Operations
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {NAV.map((section) => {
          const visibleItems = section.items.filter(item => item.roles.includes(role));
          if (!visibleItems.length) return null;
          return (
            <div key={section.section} style={{ marginBottom: 4 }}>
              <div style={{ padding: "10px 18px 4px", color: "#444", fontSize: 9, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>
                {section.section}
              </div>
              {visibleItems.map((item) => {
                const active = path === item.href || path.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 18px", textDecoration: "none",
                    background: active ? `${color}15` : "transparent",
                    borderLeft: active ? `2px solid ${color}` : "2px solid transparent",
                    color: active ? color : "#888",
                    fontSize: 12.5, transition: "all 0.12s",
                  }}>
                    <span style={{ fontSize: 13, width: 18, textAlign: "center" }}>{item.icon}</span>
                    <span style={{ fontWeight: active ? 600 : 400 }}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: "12px 14px", borderTop: "1px solid #222" }}>
        <div style={{ background: `${color}12`, border: `1px solid ${color}33`, borderRadius: 7, padding: "10px 12px", marginBottom: 8 }}>
          <div style={{ color, fontSize: 10, fontWeight: "bold", letterSpacing: 0.5 }}>{roleLabels[role] || role}</div>
          <div style={{ color: "#ccc", fontSize: 12, marginTop: 2, fontWeight: 500 }}>{fullName}</div>
          <div style={{ color: "#555", fontSize: 10, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {email}
          </div>
        </div>
        <button onClick={handleSignOut} style={{
          width: "100%", background: "transparent", border: "1px solid #222",
          borderRadius: 6, padding: "7px 10px", color: "#666", fontSize: 11, cursor: "pointer", textAlign: "center",
        }}>Sign Out</button>
      </div>
    </aside>
  );
}
