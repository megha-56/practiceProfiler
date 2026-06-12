"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const username = typeof window !== "undefined" ? localStorage.getItem("user") || "User" : "User";
  const initials = username.slice(0, 2).toUpperCase();

  const logout = () => {
    localStorage.removeItem("user");
    router.replace("/login");
  };

  const links = [
    { href: "/profile",         label: "My Profile",       Icon: IconUser },
    { href: "/edit-profile",    label: "Edit Profile",     Icon: IconEdit },
    { href: "/change-password", label: "Change Password",  Icon: IconLock },
  ];

  return (
    <aside className="sidebar">
      <div className="sb-profile">
        <div className="sb-avatar">{initials}</div>
        <div className="sb-name">{username}</div>
        <div className="sb-handle">@{username.toLowerCase()}</div>
        <div className="sb-status"><span className="sb-status-dot" />Active</div>
      </div>

      <nav className="sb-nav">
        {links.map(({ href, label, Icon }) => (
          <Link key={href} href={href} className={`sb-link${pathname === href ? " active" : ""}`}>
            <Icon />{label}
          </Link>
        ))}
      </nav>

      <div className="sb-footer">
        <button className="sb-logout" onClick={logout}>
          <IconLogout />Sign out
        </button>
      </div>
    </aside>
  );
}
