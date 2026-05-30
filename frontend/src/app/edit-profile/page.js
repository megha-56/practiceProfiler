"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { api } from "../../lib/api";

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name:"", username:"", email:"", phoneNo:"", pfp:"", gender:"", dob:"", bio:"", skills:"" });
  const [msg, setMsg] = useState({ type:"", text:"" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("user");
    if (!username) { router.replace("/login"); return; }
    api.getProfile(username).then((d) => {
      const u = d.user;
      setForm({
        name: u.name||"", username: u.username||"", email: u.email||"",
        phoneNo: u.phoneNo||"", pfp: u.pfp||"", gender: u.gender||"",
        dob: u.dob ? u.dob.slice(0,10) : "", bio: u.bio||"",
        skills: u.skills?.join(", ")||"",
      });
    }).catch(() => router.replace("/login"));
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type:"", text:"" }); setLoading(true);
    try {
      const payload = { ...form, skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean) };
      await api.editProfile(payload);
      localStorage.setItem("user", form.username);
      setMsg({ type:"success", text:"Profile updated successfully!" });
      setTimeout(() => router.push("/profile"), 1200);
    } catch (err) {
      setMsg({ type:"error", text: err.message });
    } finally { setLoading(false); }
  };

  const fields = [
    ["name",     "Full Name",       "text",     "John Doe",           false],
    ["username", "Username",        "text",     "johndoe",            false],
    ["email",    "Email Address",   "email",    "john@example.com",   false],
    ["phoneNo",  "Phone Number",    "tel",      "+91 98765 43210",    false],
    ["pfp",      "Profile Photo URL","url",     "https://…",          false],
    ["dob",      "Date of Birth",   "date",     "",                   false],
  ];

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <div className="page-header">
          <p className="page-label">Account</p>
          <h1 className="page-title">Edit Profile</h1>
          <p className="page-sub">Update your personal details below.</p>
        </div>

        <div className="card" style={{ maxWidth: 700 }}>
          <div className="card-header">
            <span className="card-title">Personal Information</span>
          </div>
          <div className="card-body">
            {msg.text && <div className={`alert alert-${msg.type}`}>{msg.type==="error"?"⚠":"✓"} {msg.text}</div>}

            <form onSubmit={submit}>
              <div className="form-grid">
                {fields.map(([name, label, type, placeholder, full]) => (
                  <div className={`form-group${full?" full":""}`} key={name}>
                    <label>{label}</label>
                    <input name={name} type={type} placeholder={placeholder}
                      value={form[name]} onChange={handle} />
                  </div>
                ))}

                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={form.gender} onChange={handle}>
                    <option value="">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>Bio</label>
                  <textarea name="bio" placeholder="Tell us something about yourself…"
                    value={form.bio} onChange={handle} />
                </div>

                <div className="form-group full">
                  <label>Skills <span style={{ textTransform:"none", letterSpacing:0, color:"var(--muted)", fontWeight:400 }}>— comma separated</span></label>
                  <input name="skills" type="text" placeholder="React, Node.js, Figma, Python…"
                    value={form.skills} onChange={handle} />
                </div>
              </div>

              <div style={{ display:"flex", gap:"0.75rem", marginTop:"1.8rem" }}>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? <><div className="spinner" />Saving…</> : "Save Changes →"}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => router.push("/profile")}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}