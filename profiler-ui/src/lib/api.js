// ─── API HELPER ──────────────────────────────────────────────────────────────
// Set your backend URL in .env.local:
//   NEXT_PUBLIC_API_URL=http://localhost:3000/api

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function req(path, opts = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    },
    ...opts,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
