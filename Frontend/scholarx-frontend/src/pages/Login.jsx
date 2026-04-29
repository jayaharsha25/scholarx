import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async () => {
    try {
      // VALIDATION
      if (!form.email || !form.password || (isRegister && !form.name)) {
        alert("Fill all fields");
        return;
      }

      // ================= REGISTER =================
      if (isRegister) {
        await API.post("/auth/register", form);

        alert("Registered successfully. Please login.");
        setIsRegister(false);
        return;
      }

      // ================= LOGIN =================
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      // save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ROLE BASED REDIRECT
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data || "Error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

        {/* NAME (REGISTER ONLY) */}
        {isRegister && (
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        {/* ROLE SELECT (REGISTER ONLY) */}
        {isRegister && (
          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0",
              borderRadius: "6px",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {/* EMAIL */}
        <input
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>

        <p onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have an account? Login"
            : "New user? Register"}
        </p>
      </div>
    </div>
  );
}