"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { req } from "../../lib/api";

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
      const data = await req("/user/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
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
          Your profile,<br /><em>beautifully</em><br />organised.
        </h1>
        <p className="auth-left-sub">
          Manage your identity, skills, and account settings — all in one clean dashboard.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2 className="auth-box-title">Welcome back.</h2>
          <p className="auth-box-sub">Sign in to continue to your profile.</p>

          {error && <div className="alert alert-error">⚠ {error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" name="username" type="text"
                placeholder="your_username" value={form.username} onChange={handle} required autoFocus />
            </div>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Password</label>
              <input className="form-input" name="password" type="password"
                placeholder="••••••••" value={form.password} onChange={handle} required />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? <><div className="spinner" />Signing in…</> : "Sign in →"}
            </button>
          </form>

          <div className="auth-switch">
            No account? <Link href="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
