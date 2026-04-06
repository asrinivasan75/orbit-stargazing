import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, UserPlus, Check, Eye, Telescope } from "lucide-react";
import useStore from "../hooks/useStore";
import { api } from "../utils/api";
import "./Friends.css";

function RevealText({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Friends() {
  const { friends, friendRequests, onlineUsers, loadFriends, loadFriendRequests } = useStore();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => { loadFriends(); loadFriendRequests(); }, [loadFriends, loadFriendRequests]);

  const sendRequest = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    try {
      await api.sendFriendRequest(username.trim());
      setMessage("Request sent!");
      setMsgType("success");
      setUsername("");
    } catch (err) {
      setMessage(err.message);
      setMsgType("error");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const acceptRequest = async (requesterId) => {
    await api.acceptFriend(requesterId);
    loadFriends();
    loadFriendRequests();
  };

  const isOnline = (id) => Object.keys(onlineUsers).includes(id);
  const getViewing = (id) => onlineUsers[id]?.viewing;

  return (
    <motion.div className="friends-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="container-narrow">
        <div className="friends-header">
          <RevealText><span className="label">Social</span></RevealText>
          <RevealText delay={0.1}><h1 className="display-md">Friends</h1></RevealText>
          <motion.p
            className="body-md text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            See what your friends are observing in real-time.
          </motion.p>
        </div>

        {/* Add friend */}
        <motion.form
          className="add-friend"
          onSubmit={sendRequest}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="add-friend-row">
            <UserPlus size={16} strokeWidth={1.5} className="text-tertiary" />
            <input
              className="input"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
          {message && (
            <motion.p
              className={`add-friend-msg body-sm ${msgType === "success" ? "text-green" : ""}`}
              style={msgType === "error" ? { color: "var(--accent-red)" } : {}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {message}
            </motion.p>
          )}
        </motion.form>

        {/* Pending requests */}
        {friendRequests.length > 0 && (
          <section className="friends-section">
            <div className="friends-section-header">
              <span className="label">Pending</span>
              <span className="badge">{friendRequests.length}</span>
            </div>
            {friendRequests.map((req) => (
              <div key={req._id} className="friend-row glass-subtle">
                <div className="friend-avatar">{req.username?.[0]?.toUpperCase()}</div>
                <div className="friend-info">
                  <span className="friend-name">{req.username}</span>
                  <span className="body-sm text-secondary">Wants to connect</span>
                </div>
                <button className="btn btn-primary" style={{ padding: "6px 14px", fontSize: "0.78rem" }} onClick={() => acceptRequest(req._id)}>
                  <Check size={13} /> Accept
                </button>
              </div>
            ))}
          </section>
        )}

        {/* Friends list */}
        <section className="friends-section">
          <div className="friends-section-header">
            <span className="label">Your friends</span>
            <span className="badge">{friends.length}</span>
          </div>

          {friends.length === 0 ? (
            <div className="friends-empty">
              <Users size={28} strokeWidth={1} className="text-tertiary" />
              <p className="body-sm text-secondary">No friends yet. Send a request above.</p>
            </div>
          ) : (
            <div className="friends-list dim-list">
              {friends.map((friend, i) => {
                const online = isOnline(friend._id);
                const viewing = getViewing(friend._id);
                return (
                  <motion.div
                    key={friend._id}
                    className="friend-row dim-item"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <div className="friend-avatar">
                      {friend.username?.[0]?.toUpperCase()}
                      <span className={`friend-dot ${online ? "online" : ""}`} />
                    </div>
                    <div className="friend-info">
                      <span className="friend-name">{friend.username}</span>
                      {online && viewing ? (
                        <span className="friend-status-text text-cyan body-sm">
                          <Eye size={11} /> Viewing {viewing.starName || viewing.constellation || "sky"}
                        </span>
                      ) : online ? (
                        <span className="friend-status-text text-green body-sm">
                          <Telescope size={11} /> Online
                        </span>
                      ) : (
                        <span className="body-sm text-tertiary">Offline</span>
                      )}
                    </div>
                    <span className="mono body-sm text-secondary">
                      {friend.totalObservations || 0} obs
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
}
