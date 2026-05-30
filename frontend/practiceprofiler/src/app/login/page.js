"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../lib/api";
 
export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
 
  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await api.login(form);
      localStorage.setItem("user", form.username);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };
 
  return (
    <div className="auth-shell">
      {/* Left panel */}
      <div className="auth-panel-left">
        <div className="auth-decoration" />
        <div className="auth-brand" style={{ position: "relative", zIndex: 1, marginBottom: "3rem" }}>
          <div className="brand-icon">✦</div>
          <span className="brand-text">Profiler</span>
        </div>
        <p className="auth-tagline" style={{ position: "relative", zIndex: 1 }}>
          Your identity,<br /><em>beautifully</em><br />organised.
        </p>
        <p className="auth-tagline-sub">Manage your profile, skills, and account — all in one clean dashboard.</p>
      </div>
 
      {/* Right panel */}
      <div className="auth-panel-right">
        <div className="auth-form-box">
          <h1 className="auth-form-title">Welcome back.</h1>
          <p className="auth-form-sub">Sign in to your account to continue.</p>
 
          {error && <div className="alert alert-error">⚠ {error}</div>}
 
          <form className="auth-form" onSubmit={submit}>
            <div className="form-group">
              <label>Username</label>
              <input name="username" type="text" placeholder="your_username"
                value={form.username} onChange={handle} required autoFocus />
            </div>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label>Password</label>
              <input name="password" type="password" placeholder="••••••••"
                value={form.password} onChange={handle} required />
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} type="submit" disabled={loading}>
              {loading ? <><div className="spinner" />Signing in…</> : "Sign In →"}
            </button>
          </form>
 
          <div className="auth-switch">
            No account yet? <Link href="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
 