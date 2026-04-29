import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [research, setResearch] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [banned, setBanned] = useState({});
  const [warnings, setWarnings] = useState({});
  const [pinned, setPinned] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const u = await API.get("/admin/users");
    const r = await API.get("/research");
    setUsers(u.data);
    setResearch(r.data);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await API.delete(`/admin/users/${id}`);
    fetchData();
  };

  const deleteAllResearch = async () => {
    if (!window.confirm("Delete ALL research?")) return;
    for (let r of research) {
      await API.delete(`/research/${r._id}`);
    }
    fetchData();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  /* USER STATS */
  const getUserStats = (userId) => {
    const userResearch = research.filter(
      (r) => r.author?._id === userId || r.author === userId
    );

    return {
      uploads: userResearch.length,
      lastUpload: userResearch.length
        ? userResearch[userResearch.length - 1].createdAt
        : null,
    };
  };

  /* SORT + SEARCH */
  const sortedUsers = [...users].sort(
    (a, b) => getUserStats(b._id).uploads - getUserStats(a._id).uploads
  );

  const filteredUsers = sortedUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const orderedUsers = [
    ...filteredUsers.filter((u) => pinned[u._id]),
    ...filteredUsers.filter((u) => !pinned[u._id]),
  ];

  /* GLOBAL SEARCH */
  const globalFilteredResearch = research.filter((r) =>
    r.title.toLowerCase().includes(globalSearch.toLowerCase())
  );

  /* ACTIONS */
  const toggleBan = (id) => {
    setBanned((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleWarning = (id) => {
    setWarnings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePin = (id) => {
    setPinned((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const downloadReport = () => {
    const blob = new Blob([JSON.stringify({ users, research }, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.json";
    link.click();
  };

  /* ANALYTICS */
  const dailyUploads = {};
  research.forEach((r) => {
    const d = new Date(r.createdAt).toLocaleDateString();
    dailyUploads[d] = (dailyUploads[d] || 0) + 1;
  });

  const mostActive = sortedUsers[0];

  return (
    <div style={container}>
      {/* HEADER */}
      <div style={topBar}>
        <h1 style={title}>👑 Admin Panel</h1>

        <div style={{ display: "flex", gap: 10 }}>
          <button style={btn} onClick={fetchData}>🔄 Refresh</button>
          <button style={btn} onClick={downloadReport}>Download Report</button>
          <button style={logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {/* STATS */}
      <div style={statsGrid}>
        <div style={statCard}>
          <h3>Total Users</h3>
          <h1>{users.length}</h1>
        </div>

        <div style={statCard}>
          <h3>Total Research</h3>
          <h1>{research.length}</h1>
        </div>

        <div style={statCard}>
          <h3>Most Active</h3>
          <h4>{mostActive?.name || "-"}</h4>
        </div>
      </div>

      {/* INSIGHTS */}
      <div style={analyticsBox}>
        <h3>🧠 Admin Insights</h3>
        <p>Avg uploads per user: {(research.length / users.length || 0).toFixed(1)}</p>
        <p>Active users: {users.filter(u => getUserStats(u._id).uploads > 0).length}</p>
      </div>

      {/* LEADERBOARD */}
      <h2 style={{ marginTop: 30 }}>🏆 Top Users</h2>
      <div style={statsGrid}>
        {sortedUsers.slice(0, 3).map((u, i) => (
          <div key={u._id} style={statCard}>
            <h3>#{i + 1} {u.name}</h3>
            <p>{getUserStats(u._id).uploads} uploads</p>
          </div>
        ))}
      </div>

      {/* DAILY ANALYTICS */}
      <div style={analyticsBox}>
        <h3>📊 Daily Uploads</h3>
        {Object.keys(dailyUploads).map((d, i) => (
          <div key={i}>{d} → {dailyUploads[d]}</div>
        ))}
      </div>

      {/* GLOBAL SEARCH */}
      <input
        placeholder="🌐 Search research..."
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
        style={searchInput}
      />

      {globalFilteredResearch.map((r) => (
        <div key={r._id} style={activityItem}>
          📄 {r.title}
        </div>
      ))}

      {/* USER SEARCH */}
      <input
        placeholder="🔍 Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchInput}
      />

      {/* FLAGGED USERS */}
      <h2 style={{ marginTop: 20 }}>🚨 Flagged Users</h2>
      {orderedUsers.filter((u) => warnings[u._id]).map((u) => (
        <div key={u._id} style={userCard}>
          ⚠️ {u.name} has been warned
        </div>
      ))}

      {/* USERS */}
      <h2 style={{ marginTop: 20 }}>Users</h2>

      {orderedUsers.map((u) => {
        const stats = getUserStats(u._id);

        return (
          <div key={u._id} style={userCard}>
            <div style={userHeader}>
              <div>
                <h3>{u.name}</h3>
                <p style={{ opacity: 0.6 }}>{u.email}</p>

                <div style={{ fontSize: 12 }}>
                  {u.role === "admin" ? "👑 Admin" : "👤 User"} •{" "}
                  {stats.lastUpload
                    ? new Date(stats.lastUpload).toLocaleDateString()
                    : "No activity"}
                </div>
              </div>

              <div style={badge}>📄 {stats.uploads}</div>
            </div>

            {warnings[u._id] && (
              <div style={warningBadge}>⚠️ Warning</div>
            )}

            <div style={userActions}>
              <button style={viewBtn} onClick={() =>
                setExpandedUser(expandedUser === u._id ? null : u._id)
              }>Activity</button>

              <button style={btn} onClick={() => togglePin(u._id)}>
                {pinned[u._id] ? "Unpin" : "Pin"}
              </button>

              <button style={btn} onClick={() => toggleBan(u._id)}>
                {banned[u._id] ? "Unban" : "Ban"}
              </button>

              <button style={btn} onClick={() => toggleWarning(u._id)}>
                Warn
              </button>

              <button style={deleteBtn} onClick={() => deleteUser(u._id)}>
                Delete
              </button>
            </div>

            {expandedUser === u._id && (
              <div style={activityBox}>
                {research
                  .filter((r) => r.author?._id === u._id || r.author === u._id)
                  .map((r) => (
                    <div key={r._id} style={activityItem}>
                      <h4>{r.title}</h4>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* STYLES */

const container = {
  padding: 30,
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f172a,#1e3a8a,#0f172a)",
  color: "white",
};

const title = { fontSize: 28 };

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const btn = {
  background: "#38bdf8",
  padding: "8px",
  borderRadius: 6,
  border: "none",
  color: "white",
};

const logoutBtn = { background: "#ef4444", padding: "8px", borderRadius: 6 };

const statsGrid = { display: "flex", gap: 20, marginTop: 25 };

const statCard = {
  flex: 1,
  background: "rgba(255,255,255,0.08)",
  padding: 20,
  borderRadius: 12,
};

const analyticsBox = {
  marginTop: 20,
  padding: 15,
  background: "rgba(255,255,255,0.05)",
};

const searchInput = { width: "100%", padding: 10, marginTop: 10 };

const userCard = { marginTop: 15, padding: 15, background: "#1f2937" };

const userHeader = { display: "flex", justifyContent: "space-between" };

const badge = { background: "#38bdf8", padding: 5 };

const warningBadge = { background: "red", padding: 4 };

const userActions = { marginTop: 10, display: "flex", gap: 5 };

const viewBtn = { background: "green", padding: 5 };

const deleteBtn = { background: "red", padding: 5 };

const activityBox = { marginTop: 10 };

const activityItem = { marginBottom: 5 };