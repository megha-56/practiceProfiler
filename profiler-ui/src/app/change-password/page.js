"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { req } from "../../lib/api";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", currentPassword: "", newPassword: "", confirm: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) { router.replace("/login"); return; }
    setForm((f) => ({ ...f, username }));
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const strength = (p) => {
    if (!p) return { w: "0%", label: "" };
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return { w: ["0%", "25%", "50%", "75%", "100%"][s], label: ["", "Weak", "Fair", "Good", "Strong"][s] };
  };

  const s = strength(form.newPassword);

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
      await req("/user/change-password", {
        method: "PUT",
        body: JSON.stringify({
          username: form.username,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      setMsg({ type: "success", text: "Password changed successfully! Redirecting…" });
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally { setLoading(false); }
  };

  return (
    <div className="dash-shell">
      <Sidebar />
      <main className="dash-main">
        <div className="page-eyebrow">Security</div>
        <h1 className="page-title">Change Password</h1>
        <p className="page-sub">Keep your account secure with a strong password.</p>

        {msg.text && (
          <div className={`alert alert-${msg.type}`} style={{ marginBottom: "1.5rem", maxWidth: 480 }}>
            {msg.type === "error" ? "⚠" : "✓"} {msg.text}
          </div>
        )}

        <form onSubmit={submit} style={{ maxWidth: 480 }}>
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">Update Password</span>
            </div>
            <div className="section-card-body">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input className="form-input" name="currentPassword" type="password"
                  placeholder="Enter your current password"
                  value={form.currentPassword} onChange={handle} required />
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input className="form-input" name="newPassword" type="password"
                  placeholder="Min. 8 characters"
                  value={form.newPassword} onChange={handle} required />
                {form.newPassword && (
                  <div className="strength-wrap">
                    <div className="strength-track">
                      <div className="strength-fill" style={{ width: s.w }} />
                    </div>
                    <span className="strength-label">{s.label}</span>
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Confirm New Password</label>
                <input className="form-input" name="confirm" type="password"
                  placeholder="Repeat new password"
                  value={form.confirm} onChange={handle} required
                  style={form.confirm && form.confirm !== form.newPassword
                    ? { borderColor: "var(--error)" } : {}} />
              </div>

              <div className="pwd-rules">
                {[
                  "At least 8 characters",
                  "One uppercase letter",
                  "One number or special character",
                ].map((rule) => (
                  <div className="pwd-rule" key={rule}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="action-row">
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "auto" }}>
              {loading ? <><div className="spinner" />Updating…</> : "Update password →"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => router.push("/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
