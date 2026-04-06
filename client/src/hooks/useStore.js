import { create } from "zustand";
import { api } from "../utils/api";

const useStore = create((set, get) => ({
  // Auth
  user: null,
  token: localStorage.getItem("orbit-token"),
  isAuthenticated: !!localStorage.getItem("orbit-token"),
  authLoading: true,

  login: async (email, password) => {
    const { token, user } = await api.login({ email, password });
    localStorage.setItem("orbit-token", token);
    set({ user, token, isAuthenticated: true });
  },

  register: async (username, email, password) => {
    const { token, user } = await api.register({ username, email, password });
    localStorage.setItem("orbit-token", token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("orbit-token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  initAuth: async () => {
    const token = localStorage.getItem("orbit-token");
    if (!token) {
      set({ authLoading: false });
      return;
    }
    try {
      const { user } = await api.getMe();
      set({ user, isAuthenticated: true, authLoading: false });
    } catch {
      localStorage.removeItem("orbit-token");
      set({ user: null, token: null, isAuthenticated: false, authLoading: false });
    }
  },

  // Star data
  stars: [],
  constellations: [],
  starsLoaded: false,

  loadStarData: async () => {
    if (get().starsLoaded) return;
    try {
      const [starData, constData] = await Promise.all([
        api.getStars(),
        api.getConstellations(),
      ]);
      set({
        stars: starData.stars,
        constellations: constData.constellations,
        starsLoaded: true,
      });
    } catch (err) {
      console.error("Failed to load star data:", err);
    }
  },

  // Favorites
  favorites: [],

  loadFavorites: async () => {
    try {
      const { favorites } = await api.getFavorites();
      set({ favorites });
    } catch { /* not logged in */ }
  },

  toggleFavorite: async (type, targetId, name) => {
    const { favorites } = await api.toggleFavorite({ type, targetId, name });
    set({ favorites });
  },

  isFavorite: (targetId) => {
    return get().favorites.some((f) => f.targetId === targetId);
  },

  // UI state
  selectedStar: null,
  selectedConstellation: null,
  searchQuery: "",
  sidebarOpen: false,

  // cameraTarget: { ra, dec } — where to point the camera
  cameraTarget: null,

  setSelectedStar: (star) => set({
    selectedStar: star,
    selectedConstellation: null,
    cameraTarget: star ? { ra: star.ra, dec: star.dec } : null,
  }),
  setSelectedConstellation: (c) => set({
    selectedConstellation: c,
    selectedStar: null,
    cameraTarget: c ? { ra: c.ra, dec: c.dec } : null,
  }),
  clearSelection: () => set({ selectedStar: null, selectedConstellation: null }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  // Friends / presence
  friends: [],
  friendRequests: [],
  onlineUsers: {},

  loadFriends: async () => {
    try {
      const { friends } = await api.getFriends();
      set({ friends });
    } catch { /* not logged in */ }
  },

  loadFriendRequests: async () => {
    try {
      const { friendRequests } = await api.getFriendRequests();
      set({ friendRequests });
    } catch { /* not logged in */ }
  },

  setOnlineUsers: (users) => set({ onlineUsers: users }),
}));

export default useStore;
