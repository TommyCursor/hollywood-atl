"use client";
import { useState } from "react";

// ─── Seed Data ────────────────────────────────────────────────────────────────
const ROLE_META: Record<string, { color: string; bg: string }> = {
  "Admin":     { color: "#C9A84C", bg: "#C9A84C18" },
  "Sub-Admin": { color: "#2196F3", bg: "#2196F318" },
  "Accounting":{ color: "#4CAF50", bg: "#4CAF5018" },
  "Manager":   { color: "#14B8A6", bg: "#14B8A618" },
  "Booking":   { color: "#9C27B0", bg: "#9C27B018" },
  "User":      { color: "#888",    bg: "#88888818" },
};

const ALL_ROLES = ["Admin","Sub-Admin","Accounting","Manager","Booking","User"];

const SEED_USERS = [
  { id: 1, name: "Marcus Johnson", email: "marcus@hollywoodatl.com",  role: "Admin",     status: "Active",   lastLogin: "2026-03-08", initials: "MJ" },
  { id: 2, name: "Tasha Williams", email: "tasha@hollywoodatl.com",   role: "Sub-Admin", status: "Active",   lastLogin: "2026-03-07", initials: "TW" },
  { id: 3, name: "Kevin Brown",    email: "kevin@hollywoodatl.com",   role: "Accounting",status: "Active",   lastLogin: "2026-03-06", initials: "KB" },
  { id: 4, name: "Denise Carter",  email: "denise@hollywoodatl.com",  role: "Manager",   status: "Active",   lastLogin: "2026-03-08", initials: "DC" },
  { id: 5, name: "James Wilson",   email: "james@hollywoodatl.com",   role: "Booking",   status: "Active",   lastLogin: "2026-03-05", initials: "JW" },
  { id: 6, name: "Layla Davis",    email: "layla@hollywoodatl.com",   role: "User",      status: "Inactive", lastLogin: "2026-02-28", initials: "LD" },
  { id: 7, name: "Tony Reeves",    email: "tony@hollywoodatl.com",    role: "User",      status: "Active",   lastLogin: "2026-03-07", initials: "TR" },
];

const SEED_PENDING = [
  { id: 8, name: "Alicia Gomez", email: "alicia@hollywoodatl.com", role: "Manager", requestedAt: "2026-03-08", initials: "AG" },
  { id: 9, name: "Derek Stone",  email: "derek@hollywoodatl.com",  role: "Booking", requestedAt: "2026-03-07", initials: "DS" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [users, setUsers]   = useState(SEED_USERS);
  const [pending, setPending] = useState(SEED_PENDING);

  const [search, setSearch]           = useState("");
  const [filterRole, setFilterRole]   = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [showAddModal, setShowAddModal]       = useState(false);
  const [showEditModal, setShowEditModal]     = useState<typeof SEED_USERS[0] | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<typeof SEED_USERS[0] | null>(null);

  const [addForm, setAddForm] = useState({ name: "", email: "", role: "User" });

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = filterRole === "All"   || u.role === filterRole;
    const matchStatus = filterStatus === "All" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const stats = {
    total:   users.length,
    pending: pending.length,
    active:  users.filter(u => u.status === "Active").length,
    inactive:users.filter(u => u.status === "Inactive").length,
  };

  function handleApprove(id: number) {
    const user = pending.find(p => p.id === id);
    if (!user) return;
    setUsers(prev => [...prev, { ...user, status: "Active", lastLogin: "Never" }]);
    setPending(prev => prev.filter(p => p.id !== id));
  }
  function handleReject(id: number) { setPending(prev => prev.filter(p => p.id !== id)); }
  function handleDelete(id: number) { setUsers(prev => prev.filter(u => u.id !== id)); setShowDeleteModal(null); }
  function handleEditRole(id: number, role: string) { setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u)); setShowEditModal(null); }
  function handleAddUser() {
    if (!addForm.name || !addForm.email) return;
    setUsers(prev => [...prev, {
      id: Date.now(), name: addForm.name, email: addForm.email, role: addForm.role,
      status: "Active", lastLogin: "Never",
      initials: addForm.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
    }]);
    setAddForm({ name: "", email: "", role: "User" });
    setShowAddModal(false);
  }

  return (
    <div className="users-page">
      <style>{`
        .users-page { min-height: 100vh; background: #0D0D0D; color: #fff; padding: 28px 32px; box-sizing: border-box; }
        .users-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; gap: 12px; flex-wrap: wrap; }
        .users-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
        .pending-card { background: #1A1A1A; border: 1px solid #FF980030; border-radius: 10px; padding: 14px 20px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .pending-info { flex: 1; min-width: 140px; }
        .pending-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .pending-actions { display: flex; gap: 8px; }
        .filter-bar { padding: 16px 20px; border-bottom: 1px solid #222; display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
        .filter-bar input, .filter-bar select { background: #111; border: 1px solid #333; border-radius: 6px; padding: 7px 12px; color: #ccc; font-size: 12px; }
        .filter-bar input { flex: 1; min-width: 160px; color: #fff; }
        /* Desktop table */
        .users-table { width: 100%; }
        .users-cards { display: none; }
        /* Mobile */
        @media (max-width: 768px) {
          .users-page { padding: 16px; }
          .users-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .pending-card { flex-direction: column; align-items: flex-start; gap: 10px; }
          .pending-actions { width: 100%; }
          .pending-actions button { flex: 1; }
          .users-table { display: none; }
          .users-cards { display: flex; flex-direction: column; gap: 0; }
        }
        @media (max-width: 480px) {
          .users-stats { grid-template-columns: repeat(2, 1fr); }
          .filter-bar { flex-direction: column; align-items: stretch; }
          .filter-bar input, .filter-bar select { width: 100%; box-sizing: border-box; }
        }
      `}</style>

      {/* ── Header ── */}
      <div className="users-header">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>User Management</h1>
          <p style={{ color: "#555", fontSize: 13, marginTop: 4 }}>
            Manage system access — add, remove, and assign roles to team members.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ background: "#C9A84C", color: "#000", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
        >+ Add User</button>
      </div>

      {/* ── Stats ── */}
      <div className="users-stats">
        {[
          { label: "Total Users",      value: stats.total,    color: "#C9A84C" },
          { label: "Pending Approval", value: stats.pending,  color: "#FF9800" },
          { label: "Active",           value: stats.active,   color: "#4CAF50" },
          { label: "Inactive",         value: stats.inactive, color: "#F44336" },
        ].map(s => (
          <div key={s.label} style={{ background: "#1A1A1A", border: "1px solid #222", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 28, fontWeight: 700, marginTop: 6 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Pending Approvals ── */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>Pending Approvals</h2>
            <span style={{ background: "#FF980020", color: "#FF9800", border: "1px solid #FF980040", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
              {pending.length} waiting
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pending.map(p => {
              const meta = ROLE_META[p.role] || ROLE_META["User"];
              return (
                <div key={p.id} className="pending-card">
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FF980020", border: "1px solid #FF980040", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF9800", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                    {p.initials}
                  </div>
                  <div className="pending-info">
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>{p.email}</div>
                  </div>
                  <div className="pending-meta">
                    <span style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}40`, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{p.role}</span>
                    <span style={{ color: "#444", fontSize: 11 }}>Requested {p.requestedAt}</span>
                  </div>
                  <div className="pending-actions">
                    <button onClick={() => handleApprove(p.id)} style={{ background: "#4CAF5018", border: "1px solid #4CAF5040", borderRadius: 6, padding: "7px 16px", color: "#4CAF50", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Approve</button>
                    <button onClick={() => handleReject(p.id)}  style={{ background: "#F4433618", border: "1px solid #F4433640", borderRadius: 6, padding: "7px 16px", color: "#F44336", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Reject</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Users Table / Cards ── */}
      <div style={{ background: "#1A1A1A", border: "1px solid #222", borderRadius: 12 }}>

        {/* Filters */}
        <div className="filter-bar">
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0, flex: "none" }}>All Users</h2>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
            <option value="All">All Roles</option>
            {ALL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Desktop Table */}
        <div className="users-table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #222" }}>
                {["User","Email","Role","Status","Last Login","Actions"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", color: "#555", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, textAlign: h === "Actions" ? "right" : "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ padding: "40px 20px", textAlign: "center", color: "#444", fontSize: 13 }}>No users match your filters.</td></tr>
              )}
              {filtered.map((u, i) => {
                const meta = ROLE_META[u.role] || ROLE_META["User"];
                const isActive = u.status === "Active";
                return (
                  <tr key={u.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #1e1e1e" : "none" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: meta.bg, border: `1px solid ${meta.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: meta.color, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{u.initials}</div>
                        <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#666", fontSize: 12 }}>{u.email}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}40`, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{u.role}</span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: isActive ? "#4CAF5018" : "#F4433618", color: isActive ? "#4CAF50" : "#F44336", border: `1px solid ${isActive ? "#4CAF5040" : "#F4433640"}`, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 600 }}>{u.status}</span>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#555", fontSize: 12 }}>{u.lastLogin}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button onClick={() => setShowEditModal(u)} style={{ background: "#2196F318", border: "1px solid #2196F340", borderRadius: 6, padding: "5px 14px", color: "#2196F3", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Edit Role</button>
                        <button onClick={() => setShowDeleteModal(u)} style={{ background: "#F4433618", border: "1px solid #F4433640", borderRadius: 6, padding: "5px 14px", color: "#F44336", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Remove</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="users-cards">
          {filtered.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#444", fontSize: 13 }}>No users match your filters.</div>
          )}
          {filtered.map((u, i) => {
            const meta = ROLE_META[u.role] || ROLE_META["User"];
            const isActive = u.status === "Active";
            return (
              <div key={u.id} style={{ padding: "16px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #1e1e1e" : "none" }}>
                {/* Top row: avatar + name + status */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: meta.bg, border: `1px solid ${meta.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: meta.color, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{u.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{u.name}</div>
                    <div style={{ color: "#555", fontSize: 11, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                  </div>
                  <span style={{ background: isActive ? "#4CAF5018" : "#F4433618", color: isActive ? "#4CAF50" : "#F44336", border: `1px solid ${isActive ? "#4CAF5040" : "#F4433640"}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{u.status}</span>
                </div>
                {/* Role + last login */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}40`, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{u.role}</span>
                  <span style={{ color: "#444", fontSize: 11 }}>Last login: {u.lastLogin}</span>
                </div>
                {/* Actions */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setShowEditModal(u)} style={{ flex: 1, background: "#2196F318", border: "1px solid #2196F340", borderRadius: 6, padding: "8px", color: "#2196F3", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit Role</button>
                  <button onClick={() => setShowDeleteModal(u)} style={{ flex: 1, background: "#F4433618", border: "1px solid #F4433640", borderRadius: 6, padding: "8px", color: "#F44336", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ padding: "12px 20px", borderTop: "1px solid #1e1e1e", color: "#444", fontSize: 11 }}>
          Showing {filtered.length} of {users.length} users
        </div>
      </div>

      {/* ── Add User Modal ── */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000BB", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setShowAddModal(false)}>
          <div style={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 14, padding: 28, width: "100%", maxWidth: 420, boxSizing: "border-box" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Add New User</h3>
            <p style={{ color: "#555", fontSize: 12, margin: "0 0 22px" }}>Create an account and assign a role. An invite email will be sent. (M2)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ color: "#888", fontSize: 11, display: "block", marginBottom: 6 }}>FULL NAME</label>
                <input type="text" placeholder="e.g. Marcus Johnson" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
                  style={{ width: "100%", boxSizing: "border-box", background: "#111", border: "1px solid #333", borderRadius: 7, padding: "9px 12px", color: "#fff", fontSize: 13 }} />
              </div>
              <div>
                <label style={{ color: "#888", fontSize: 11, display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
                <input type="email" placeholder="user@hollywoodatl.com" value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))}
                  style={{ width: "100%", boxSizing: "border-box", background: "#111", border: "1px solid #333", borderRadius: 7, padding: "9px 12px", color: "#fff", fontSize: 13 }} />
              </div>
              <div>
                <label style={{ color: "#888", fontSize: 11, display: "block", marginBottom: 6 }}>ROLE</label>
                <select value={addForm.role} onChange={e => setAddForm(f => ({ ...f, role: e.target.value }))}
                  style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 7, padding: "9px 12px", color: "#fff", fontSize: 13 }}>
                  {ALL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {addForm.role && (
                  <div style={{ marginTop: 8, padding: "8px 12px", background: ROLE_META[addForm.role]?.bg, border: `1px solid ${ROLE_META[addForm.role]?.color}40`, borderRadius: 6, color: ROLE_META[addForm.role]?.color, fontSize: 11 }}>
                    {addForm.role === "Admin"      && "Full system control — all financial dashboards, settings, and user management."}
                    {addForm.role === "Sub-Admin"  && "Operational leadership — event creation, revenue review, staff management."}
                    {addForm.role === "Accounting" && "Read-only financial access — view reports and export PDFs only."}
                    {addForm.role === "Manager"    && "Department ops — schedules, clock-in reports, staff notes."}
                    {addForm.role === "Booking"    && "Sales access — guest list, section bookings, contact management."}
                    {addForm.role === "User"       && "Staff level — personal schedule, clock-in, tip tracking only."}
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowAddModal(false)} style={{ flex: 1, background: "transparent", border: "1px solid #333", borderRadius: 7, padding: "9px", color: "#666", fontSize: 13, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleAddUser} style={{ flex: 2, background: "#C9A84C", border: "none", borderRadius: 7, padding: "9px", color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Send Invite</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Role Modal ── */}
      {showEditModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000BB", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setShowEditModal(null)}>
          <div style={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 14, padding: 28, width: "100%", maxWidth: 380, boxSizing: "border-box" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Edit Role</h3>
            <p style={{ color: "#555", fontSize: 12, margin: "0 0 20px" }}>
              Change access level for <strong style={{ color: "#ccc" }}>{showEditModal.name}</strong>
            </p>
            <div>
              <label style={{ color: "#888", fontSize: 11, display: "block", marginBottom: 6 }}>NEW ROLE</label>
              <select defaultValue={showEditModal.role} onChange={e => handleEditRole(showEditModal.id, e.target.value)}
                style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 7, padding: "9px 12px", color: "#fff", fontSize: 13 }}>
                {ALL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button onClick={() => setShowEditModal(null)} style={{ flex: 1, background: "transparent", border: "1px solid #333", borderRadius: 7, padding: "9px", color: "#666", fontSize: 13, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => setShowEditModal(null)} style={{ flex: 2, background: "#2196F3", border: "none", borderRadius: 7, padding: "9px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000BB", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setShowDeleteModal(null)}>
          <div style={{ background: "#1A1A1A", border: "1px solid #F4433640", borderRadius: 14, padding: 28, width: "100%", maxWidth: 360, boxSizing: "border-box", textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Remove User</h3>
            <p style={{ color: "#888", fontSize: 13, lineHeight: 1.5 }}>
              Are you sure you want to remove <strong style={{ color: "#fff" }}>{showDeleteModal.name}</strong>?
              They will lose all system access immediately.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button onClick={() => setShowDeleteModal(null)} style={{ flex: 1, background: "transparent", border: "1px solid #333", borderRadius: 7, padding: "9px", color: "#666", fontSize: 13, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => handleDelete(showDeleteModal.id)} style={{ flex: 2, background: "#F44336", border: "none", borderRadius: 7, padding: "9px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
