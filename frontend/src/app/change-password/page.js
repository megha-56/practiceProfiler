"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { api } from "../../lib/api";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", currentPassword: "", newPassword: "", confirm: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("user");
    if (!username) { router.replace("/login"); return; }
    setForm((f) => ({ ...f, username }));
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    if (form.newPassword !== form.confirm) {
      setMsg({ type: "error", text: "New passwords do not match." }); return;
    }
    if (form.newPassword.length < 8) {
      setMsg({ type: "error", text: "Password must be at least 8 characters." }); return;
    }
    setLoading(true);
    try {
      await api.changePassword({ username: form.username, currentPassword: form.currentPassword, newPassword: form.newPassword });
      setMsg({ type: "success", text: "Password changed! Redirecting…" });
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally { setLoading(false); }
  };

  const strength = (p) => {
    if (!p) return { w: "0%", color: "transparent", label: "" };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const map =    ["", "25%", "50%", "75%", "100%"];
    const colors = ["", "var(--rust)", "#f59e0b", "#3b82f6", "var(--success)"];
    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    return { w: map[score], color: colors[score], label: labels[score] };
  };

  const s = strength(form.newPassword);

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <div className="page-header">
          <p className="page-label">Account</p>
          <h1 className="page-title">Change Password.</h1>
          <p className="page-sub">Choose a strong, unique password.</p>
        </div>

        <div className="card" style={{ maxWidth: 500 }}>
          <div className="card-header">
            <span className="card-title">Update Password</span>
          </div>
          <div className="card-body">
            {msg.text && (
              <div className={`alert alert-${msg.type}`}>
                {msg.type === "error" ? "⚠" : "✓"} {msg.text}
              </div>
            )}

            <form onSubmit={submit}>
              <div className="form-group" style={{ marginBottom: "1.1rem" }}>
                <label>Current Password</label>
                <input name="currentPassword" type="password" placeholder="Your current password"
                  value={form.currentPassword} onChange={handle} required />
              </div>

              <div className="form-group" style={{ marginBottom: "1.1rem" }}>
                <label>New Password</label>
                <input name="newPassword" type="password" placeholder="Min. 8 characters"
                  value={form.newPassword} onChange={handle} required />
                {form.newPassword && (
                  <div>
                    <div className="strength-bar">
                      <div className="strength-fill" style={{ width: s.w, background: s.color }} />
                    </div>
                    <span className="strength-label" style={{ color: s.color }}>{s.label}</span>
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: "1.8rem" }}>
                <label>Confirm New Password</label>
                <input name="confirm" type="password" placeholder="Repeat new password"
                  value={form.confirm} onChange={handle} required
                  style={form.confirm && form.confirm !== form.newPassword ? { borderColor: "var(--rust)" } : {}} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? <><div className="spinner" />Updating…</> : "Update Password →"}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => router.push("/profile")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}