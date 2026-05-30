const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const api = {
  register:       (b) => req("/register",        { method: "POST", body: JSON.stringify(b) }),
  login:          (b) => req("/login",            { method: "POST", body: JSON.stringify(b) }),
  getProfile:     (u) => req("/profile",          { method: "POST", body: JSON.stringify({ username: u }) }),
  editProfile:    (b) => req("/edit-profile",     { method: "PUT",  body: JSON.stringify(b) }),
  changePassword: (b) => req("/change-password",  { method: "PUT",  body: JSON.stringify(b) }),
};