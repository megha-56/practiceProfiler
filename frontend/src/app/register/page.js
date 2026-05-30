"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../lib/api";
 
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
      await api.register(form);
      setMsg({ type: "success", text: "Account created! Redirecting…" });
      setTimeout(() => router.push("/login"), 1400);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally { setLoading(false); }
  };
 
  return (
    <div className="auth-shell">
      <div className="auth-panel-left">
        <div className="auth-decoration" />
        <div className="auth-brand" style={{ position: "relative", zIndex: 1, marginBottom: "3rem" }}>
          <div className="brand-icon">✦</div>
          <span className="brand-text">Profiler</span>
        </div>
        <p className="auth-tagline" style={{ position: "relative", zIndex: 1 }}>
          Join the<br /><em>network</em><br />of makers.
        </p>
        <p className="auth-tagline-sub">Create your profile and showcase your skills to the world.</p>
      </div>
 
      <div className="auth-panel-right">
        <div className="auth-form-box" style={{ maxWidth: 460 }}>
          <h1 className="auth-form-title">Create account.</h1>
          <p className="auth-form-sub">Takes less than a minute.</p>
 
          {msg.text && <div className={`alert alert-${msg.type}`}>{msg.type === "error" ? "⚠" : "✓"} {msg.text}</div>}
 
          <form className="auth-form" onSubmit={submit}>
            <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {[
                ["name",     "Full Name",    "text",  "John Doe",           false],
                ["username", "Username",     "text",  "johndoe",            false],
                ["email",    "Email",        "email", "john@example.com",   true],
                ["phoneNo",  "Phone Number", "tel",   "+91 98765 43210",    false],
                ["password", "Password",     "password", "Min. 8 chars",   false],
              ].map(([name, label, type, placeholder, full]) => (
                <div className={`form-group${full ? " full" : ""}`} key={name}>
                  <label>{label}</label>
                  <input name={name} type={type} placeholder={placeholder}
                    value={form[name]} onChange={handle} required
                    minLength={name === "password" ? 8 : undefined} />
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: "1.2rem" }} type="submit" disabled={loading}>
              {loading ? <><div className="spinner" />Creating…</> : "Create Account →"}
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
 