"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import { req } from "../../lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) { router.replace("/login"); return; }

    req("/user/profile", {
      method: "POST",
      body: JSON.stringify({ username }),
    })
      .then((d) => setUser(d.user))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const initials = user?.name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";
  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" })
    : "—";
  const dob = user?.dob
    ? new Date(user.dob).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  if (loading) return (
    <div className="dash-shell">
      <Sidebar />
      <main className="dash-main" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--ink-3)" }}>
          <div className="spinner" style={{ borderTopColor: "var(--violet)" }} />
          Loading profile…
        </div>
      </main>
    </div>
  );

  return (
    <div className="dash-shell">
      <Sidebar />
      <main className="dash-main">
        <div className="page-eyebrow">Dashboard</div>
        <h1 className="page-title">My Profile</h1>
        <p className="page-sub">Your personal details and information.</p>

        {error && <div className="alert alert-error" style={{ marginBottom: "1.5rem" }}>⚠ {error}</div>}

        {user && (<>
          <div className="profile-hero">
            <div className="profile-hero-avatar">{initials}</div>
            <div>
              <div className="profile-hero-name">{user.name}</div>
              <div className="profile-hero-handle">@{user.username}</div>
              {user.bio && <div className="profile-hero-bio">{user.bio}</div>}
              <div className="profile-joined">✦ Member since {joined}</div>
            </div>
          </div>

          <div className="info-grid">
            {[
              ["✉", "Email",    user.email   || "—"],
              ["☎", "Phone",    user.phoneNo || "—"],
              ["◈", "Gender",   user.gender  || "—"],
              ["◷", "Birthday", dob],
            ].map(([icon, label, value]) => (
              <div className="info-card" key={label}>
                <div className="info-card-label">{icon} {label}</div>
                <div className={`info-card-value${value === "—" ? " empty" : ""}`}>{value}</div>
              </div>
            ))}
          </div>

          {user.skills?.length > 0 && (
            <div className="section-card">
              <div className="section-card-header">
                <span className="section-card-title">Skills</span>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-3)" }}>{user.skills.length} listed</span>
              </div>
              <div className="section-card-body">
                <div className="skills-wrap">
                  {user.skills.map((s) => <span className="skill-pill" key={s}>{s}</span>)}
                </div>
              </div>
            </div>
          )}

          <div className="action-row">
            <Link href="/edit-profile"><button className="btn btn-primary" style={{ width: "auto" }}>✦ Edit Profile</button></Link>
            <Link href="/change-password"><button className="btn btn-outline">⬡ Change Password</button></Link>
          </div>
        </>)}
      </main>
    </div>
  );
}
