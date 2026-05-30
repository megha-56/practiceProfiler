"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import { api } from "../../lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("user");
    if (!username) { router.replace("/login"); return; }
    api.getProfile(username)
      .then((d) => setUser(d.user))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const initials = user?.name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";
  const joined = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" }) : "—";

  if (loading) return (
    <div className="shell">
      <Sidebar />
      <main className="main" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
        <div className="spinner" style={{ borderTopColor: "var(--gold)", marginRight: 12 }} /> Loading profile…
      </main>
    </div>
  );

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <div className="page-header">
          <p className="page-label">Dashboard</p>
          <h1 className="page-title">My Profile</h1>
          <p className="page-sub">Your personal details and information.</p>
        </div>

        {error && <div className="alert alert-error" style={{ marginBottom: "1.5rem" }}>⚠ {error}</div>}

        {user && (<>
          {/* Hero */}
          <div className="profile-hero">
            <div className="hero-inner">
              <div className="avatar-ring">{initials}</div>
              <div>
                <div className="hero-name">{user.name}</div>
                <div className="hero-handle">@{user.username}</div>
                {user.bio && <div className="hero-bio">{user.bio}</div>}
                <div className="hero-badge">✦ Member since {joined}</div>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="info-grid" style={{ marginBottom: "1.5rem" }}>
            {[
              ["Email",   user.email   || "—"],
              ["Phone",   user.phoneNo || "—"],
              ["Gender",  user.gender  || "—"],
              ["Date of Birth", user.dob ? new Date(user.dob).toLocaleDateString("en-IN") : "—"],
            ].map(([label, value]) => (
              <div className="info-cell" key={label}>
                <div className="info-cell-label">{label}</div>
                <div className="info-cell-value">{value}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="card" style={{ marginBottom: "1.5rem" }}>
              <div className="card-header">
                <span className="card-title">Skills</span>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{user.skills.length} listed</span>
              </div>
              <div className="card-body">
                <div className="skills-grid">
                  {user.skills.map((s) => <span className="skill-pill" key={s}>{s}</span>)}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/edit-profile"><button className="btn btn-gold">✦ Edit Profile</button></Link>
            <Link href="/change-password"><button className="btn btn-ghost">⬡ Change Password</button></Link>
          </div>
        </>)}
      </main>
    </div>
  );
}