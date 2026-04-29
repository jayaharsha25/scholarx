import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  const text = "Research Platform";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home">

      {/* HEADER */}
      <header className="header">
        <h2 className="logo">ScholarX</h2>

        <nav className="nav-links">
          <span onClick={() => scrollTo("home")}>Home</span>
          <span onClick={() => scrollTo("features")}>Features</span>
          <span onClick={() => scrollTo("about")}>About</span>
          <span onClick={() => scrollTo("contact")}>Contact</span>
        </nav>

        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button className="admin" onClick={() => navigate("/login")}>
            Admin
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-left">
          <h1>
            Smart <span>{displayText}</span>
          </h1>

          <p>
            Upload, manage and showcase your research in a powerful modern platform.
          </p>

          <button className="main-btn" onClick={() => navigate("/login")}>
            Get Started 🚀
          </button>
        </div>

        {/* RIGHT SIDE (HORIZONTAL STATS) */}
        <div className="dashboard-preview">
          <div className="stat-box">
            <p>Uploads</p>
            <h2>10,248</h2>
          </div>

          <div className="stat-box">
            <p>Researchers</p>
            <h2>2,134</h2>
          </div>

          <div className="stat-box">
            <p>Projects</p>
            <h2>589</h2>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="card">
            <h3>📤 Upload Research</h3>
            <p>Upload PDFs, reports, and research documents easily</p>
          </div>

          <div className="card">
            <h3>📊 Smart Dashboard</h3>
            <p>Track all your research activity in one place</p>
          </div>

          <div className="card">
            <h3>🔐 Secure Access</h3>
            <p>JWT authentication keeps your data safe</p>
          </div>

          <div className="card">
            <h3>👨‍💻 Admin Panel</h3>
            <p>Admins can monitor users and research uploads</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <h2>About ScholarX</h2>

        <p>
          ScholarX is a modern research management platform built using MERN Stack.
          It allows students, researchers, and institutions to upload, organize,
          and share research papers efficiently.
        </p>

        <p>
          With features like secure authentication, file uploads, and dashboards,
          ScholarX simplifies research handling in a clean and scalable way.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <h2>Contact</h2>

        <p>Email: <b>kjayaharsha8@gmail.com</b></p>
        <p>Developer: Harsha Kotha</p>
        <p>Project: ScholarX Research Platform</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 ScholarX | All Rights Reserved</p>
      </footer>

    </div>
  );
}