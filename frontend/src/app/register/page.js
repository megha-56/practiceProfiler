"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { req } from "../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", username: "", email: "", phoneNo: "", password: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" }); setLoading(true);
    try {
      await req("/user/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setMsg({ type: "success", text: "Account created! Redirecting to login…" });
      setTimeout(() => router.push("/login"), 1400);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-bg">
      <div className="auth-left">
        <div className="auth-left-brand">
          <div className="brand-mark">P</div>
          <span className="brand-name">Profiler</span>
        </div>
        <h1 className="auth-left-headline">
          Join the<br /><em>network</em><br />of builders.
        </h1>
        <p className="auth-left-sub">
          Create your profile, showcase your skills, and connect with opportunities.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-box" style={{ maxWidth: 460 }}>
          <h2 className="auth-box-title">Create account.</h2>
          <p className="auth-box-sub">Takes less than a minute.</p>

          {msg.text && (
            <div className={`alert alert-${msg.type}`}>
              {msg.type === "error" ? "⚠" : "✓"} {msg.text}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="form-divider">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" name="name" type="text"
                  placeholder="Megha Panthi" value={form.name} onChange={handle} required />
              </div>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input className="form-input" name="username" type="text"
                  placeholder="meghapanthi" value={form.username} onChange={handle} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" name="email" type="email"
                placeholder="you@example.com" value={form.email} onChange={handle} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" name="phoneNo" type="tel"
                placeholder="+91 98765 43210" value={form.phoneNo} onChange={handle} required />
            </div>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Password</label>
              <input className="form-input" name="password" type="password"
                placeholder="Min. 8 characters" value={form.password} onChange={handle} required minLength={8} />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? <><div className="spinner" />Creating account…</> : "Create account →"}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
