import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("publications");
  const [research, setResearch] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [streak, setStreak] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({ title: "", abstract: "" });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("streakData"));
    if (saved) setStreak(saved.count);
  }, []);

  const fetchData = async () => {
    const res = await API.get("/research");

    const myData = res.data.filter(
      (r) =>
        r.author?._id === user?._id ||
        r.author === user?._id
    );

    setResearch(myData);
    setFiltered(myData);
  };

  useEffect(() => {
    if (!user) navigate("/login");
    fetchData();
  }, []);

  useEffect(() => {
    let data = [...research];

    if (search) {
      data = data.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [search, research]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem("streakData"));

    if (!saved) {
      const newData = { count: 1, lastDate: today };
      localStorage.setItem("streakData", JSON.stringify(newData));
      setStreak(1);
      return;
    }

    if (saved.lastDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (new Date(saved.lastDate).toDateString() === yesterday.toDateString()) {
      const newData = {
        count: saved.count + 1,
        lastDate: today,
      };
      localStorage.setItem("streakData", JSON.stringify(newData));
      setStreak(newData.count);
    } else {
      const newData = { count: 1, lastDate: today };
      localStorage.setItem("streakData", JSON.stringify(newData));
      setStreak(1);
    }
  };

  const handleSubmit = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("abstract", form.abstract);
    formData.append("file", file);

    await API.post("/research", formData);

    updateStreak();
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await API.delete(`/research/${id}`);
    fetchData();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getReadTime = (text) => {
    const words = text.split(" ").length;
    return Math.ceil(words / 200) + " min read";
  };

  const scholarScore =
    research.length * 10 +
    research.length * 5 +
    research.length * 3;

  const getBadges = () => {
    let b = [];
    if (research.length >= 1) b.push("📄 First Publication");
    if (research.length >= 3) b.push("🚀 Rising Researcher");
    if (research.length >= 5) b.push("🔥 Top Contributor");
    if (streak >= 3) b.push("🔥 Consistent Creator");
    return b;
  };

  return (
    <div style={container}>
      <Navbar />

      <div style={contentWrapper}>
        <div style={{ flex: 1 }}>
          {/* HEADER */}
          <div style={header}>
            <h2>Dashboard</h2>

            <div style={tabs}>
              <span
                onClick={() => setActiveTab("publications")}
                style={activeTab === "publications" ? activeTabStyle : tab}
              >
                My Publications
              </span>

              <span
                onClick={() => setActiveTab("analytics")}
                style={activeTab === "analytics" ? activeTabStyle : tab}
              >
                Analytics
              </span>
            </div>

            {/* PROFILE */}
            <div style={{ position: "relative" }}>
              <button
                style={profileBtn}
                onClick={() => setShowProfile((prev) => !prev)}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>

              {showProfile && (
                <div style={profilePanel}>
                  <div style={avatar}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <h3>{user?.name}</h3>
                  <p style={{ opacity: 0.7 }}>{user?.email}</p>

                  <button style={logoutBtn} onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* PUBLICATIONS */}
          {activeTab === "publications" && (
            <>
              <input
                placeholder="🔍 Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={searchInput}
              />

              <div style={card}>
                <h3>Add Research</h3>

                <input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  style={input}
                />

                <textarea
                  placeholder="Abstract"
                  value={form.abstract}
                  onChange={(e) =>
                    setForm({ ...form, abstract: e.target.value })
                  }
                  style={textarea}
                />

                <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                <button style={uploadBtn} onClick={handleSubmit}>
                  Upload 🚀
                </button>
              </div>

              <h3 style={{ marginTop: 30 }}>
                My Publications ({research.length})
              </h3>

              <div style={grid}>
                {filtered.map((r) => (
                  <div key={r._id} style={cardItem}>
                    <h4>{r.title}</h4>
                    <p style={{ opacity: 0.7 }}>
                      {r.abstract.slice(0, 90)}...
                    </p>

                    <span style={readTime}>
                      ⏱️ {getReadTime(r.abstract)}
                    </span>

                    <div style={actions}>
                      <a
                        href={`http://localhost:5000/uploads/${r.file}`}
                        target="_blank"
                        rel="noreferrer"
                        style={previewBtn}
                      >
                        Preview
                      </a>

                      <button
                        style={deleteBtn}
                        onClick={() => handleDelete(r._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div style={analyticsPage}>
              <h2>📊 Analytics Dashboard</h2>

              <div style={analyticsGrid}>
                <div style={bigStat}>
                  <h1>{research.length}</h1>
                  <p>Total Uploads</p>
                </div>

                <div style={bigStat}>
                  <h1>{timeSpent}s</h1>
                  <p>Time Spent</p>
                </div>

                <div style={bigStat}>
                  <h1>{scholarScore}</h1>
                  <p>Scholar Score ⭐</p>
                </div>

                <div style={bigStat}>
                  <h1>{streak} 🔥</h1>
                  <p>Upload Streak</p>
                </div>
              </div>

              <h3 style={{ marginTop: 30 }}>🏆 Achievements</h3>

              <div style={badgeGrid}>
                {getBadges().map((b, i) => (
                  <div key={i} style={badgeCard}>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={trending}>
          <h3>🔥 Hot This Week</h3>
          {research.slice(0, 3).map((r) => (
            <div key={r._id} style={trendItem}>
              {r.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* UI STYLES */

const container = {
  background: "linear-gradient(135deg,#0f172a,#1e3a8a)",
  minHeight: "100vh",
  color: "white",
};

const contentWrapper = {
  display: "flex",
  gap: 30,
  padding: 30,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const tabs = { display: "flex", gap: 25 };

const tab = {
  cursor: "pointer",
  opacity: 0.6,
  paddingBottom: 5,
};

const activeTabStyle = {
  borderBottom: "2px solid #38bdf8",
  fontWeight: "bold",
};

const profileBtn = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "#38bdf8",
  border: "none",
  color: "white",
};

const profilePanel = {
  position: "absolute",
  top: 55,
  right: 0,
  width: 220,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  padding: 18,
  borderRadius: 14,
};

const avatar = {
  width: 55,
  height: 55,
  borderRadius: "50%",
  background: "#38bdf8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
};

const logoutBtn = {
  background: "#ef4444",
  padding: 8,
  borderRadius: 8,
  border: "none",
  color: "white",
};

const searchInput = {
  width: "100%",
  padding: 14,
  borderRadius: 12,
  background: "rgba(255,255,255,0.08)",
  color: "white",
};

const card = {
  marginTop: 20,
  padding: 22,
  background: "rgba(255,255,255,0.08)",
  borderRadius: 14,
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 10,
  background: "rgba(255,255,255,0.08)",
  color: "white",
};

const textarea = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 10,
  background: "rgba(255,255,255,0.08)",
  color: "white",
};

const uploadBtn = {
  background: "#38bdf8",
  padding: 10,
  borderRadius: 8,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
  gap: 20,
  marginTop: 20,
};

const cardItem = {
  background: "rgba(255,255,255,0.08)",
  padding: 18,
  borderRadius: 14,
};

const actions = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 10,
};

const previewBtn = {
  background: "#38bdf8",
  padding: "6px 10px",
  borderRadius: 6,
  color: "white",
};

const deleteBtn = {
  background: "#ef4444",
  padding: "6px 10px",
  borderRadius: 6,
};

const analyticsPage = {
  marginTop: 30,
  padding: 20,
  background: "rgba(255,255,255,0.05)",
  borderRadius: 14,
};

const analyticsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 25,
  marginTop: 20,
};

const bigStat = {
  background: "rgba(255,255,255,0.1)",
  padding: 30,
  borderRadius: 14,
  textAlign: "center",
};

const badgeGrid = {
  display: "flex",
  gap: 15,
  marginTop: 15,
  flexWrap: "wrap",
};

const badgeCard = {
  background: "#facc15",
  padding: "10px 15px",
  borderRadius: 10,
};

const readTime = { fontSize: 12, opacity: 0.7 };

const trending = {
  width: 220,
  background: "rgba(255,255,255,0.08)",
  padding: 15,
  borderRadius: 14,
};

const trendItem = {
  marginTop: 10,
  padding: 10,
  borderRadius: 8,
  background: "rgba(255,255,255,0.1)",
};