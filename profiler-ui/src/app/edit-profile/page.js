"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { req } from "../../lib/api";

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", username: "", email: "", phoneNo: "",
    bio: "", skills: "", gender: "", dob: "",
  });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) { router.replace("/login"); return; }

    req("/user/profile", {
      method: "POST",
      body: JSON.stringify({ username }),
    })
      .then((d) => setForm(d.user))
      .catch(() => setMsg({ type: "error", text: "Failed to load profile." }));
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" }); setLoading(true);
    try {
      await req("/user/edit", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setMsg({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally { setLoading(false); }
  };

  return (
    <div className="dash-shell">
      <Sidebar />
      <main className="dash-main">
        <div className="page-eyebrow">Dashboard</div>
        <h1 className="page-title">Edit Profile</h1>
        <p className="page-sub">Update your profile information.</p>

        {msg.text && (
          <div className={`alert alert-${msg.type}`} style={{ marginBottom: "1.5rem", maxWidth: 520 }}>
            {msg.type === "error" ? "⚠" : "✓"} {msg.text}
          </div>
        )}

        <form onSubmit={submit} style={{ maxWidth: 520 }}>
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">Personal Info</span>
            </div>
            <div className="section-card-body">

              <div className="form-group">
                <label className="form-label">Username</label>
                <input className="form-input" value={form.username} disabled />
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" name="name" type="text"
                  placeholder="Enter your full name" value={form.name} onChange={handle} required />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" name="email" type="email"
                  placeholder="Enter your email" value={form.email} onChange={handle} required />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" name="phoneNo" type="tel"
                  placeholder="Enter your phone number" value={form.phoneNo} onChange={handle} />
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select className="form-input" name="gender" value={form.gender} onChange={handle}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input className="form-input" name="dob" type="date"
                  value={form.dob} onChange={handle} />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Bio</label>
                <textarea className="form-input" name="bio"
                  placeholder="Tell us about yourself"
                  value={form.bio} onChange={handle} rows={3} />
              </div>

            </div>
          </div>

          <div className="action-row">
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "auto" }}>
              {loading ? <><div className="spinner" />Saving…</> : "Save Changes →"}
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
