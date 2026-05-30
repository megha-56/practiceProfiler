"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
 
export default function Sidebar() {
  const router = useRouter();
  const path = usePathname();
 
  const logout = () => { localStorage.removeItem("user"); router.replace("/login"); };
 
  const links = [
    { href: "/profile",         icon: "◈", label: "Profile" },
    { href: "/edit-profile",    icon: "✦", label: "Edit Profile" },
    { href: "/change-password", icon: "⬡", label: "Change Password" },
  ];
 
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">✦</div>
        <span className="brand-text">Profiler</span>
      </div>
 
      <nav className="sidebar-nav">
        {links.map((l) => (
          <Link key={l.href} href={l.href}
            className={`nav-item${path === l.href ? " active" : ""}`}>
            <span className="nav-icon">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </nav>
 
      <div className="sidebar-footer">
        <button className="nav-item" onClick={logout} style={{ color: "rgba(245,240,232,0.4)" }}>
          <span className="nav-icon">⇥</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
 