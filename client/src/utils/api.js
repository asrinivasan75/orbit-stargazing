const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

function getHeaders() {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("orbit-token");
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...getHeaders(), ...options.headers },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  // Auth
  register: (body) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  getMe: () => request("/auth/me"),

  // Stars
  getStars: () => request("/stars"),
  getConstellations: () => request("/stars/constellations"),
  getConstellation: (id) => request(`/stars/constellations/${id}`),
  searchStars: (q) => request(`/stars/search?q=${encodeURIComponent(q)}`),

  // User
  updateProfile: (body) =>
    request("/users/profile", { method: "PATCH", body: JSON.stringify(body) }),
  toggleFavorite: (body) =>
    request("/users/favorites", { method: "POST", body: JSON.stringify(body) }),
  getFavorites: () => request("/users/favorites"),
  logObservation: (body) =>
    request("/users/observations", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  getObservations: () => request("/users/observations"),
  getUser: (username) => request(`/users/${username}`),

  // Social
  sendFriendRequest: (targetUsername) =>
    request("/social/friend-request", {
      method: "POST",
      body: JSON.stringify({ targetUsername }),
    }),
  acceptFriend: (requesterId) =>
    request("/social/accept-friend", {
      method: "POST",
      body: JSON.stringify({ requesterId }),
    }),
  getFriends: () => request("/social/friends"),
  getFriendRequests: () => request("/social/friend-requests"),
};
