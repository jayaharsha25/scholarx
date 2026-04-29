import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered Successfully");
      navigate("/");
    } catch {
      alert("Error");
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>Register</h2>

        <input placeholder="Name" style={input}
          onChange={e => setData({ ...data, name: e.target.value })} />

        <input placeholder="Email" style={input}
          onChange={e => setData({ ...data, email: e.target.value })} />

        <input type="password" placeholder="Password" style={input}
          onChange={e => setData({ ...data, password: e.target.value })} />

        <button style={button} onClick={handleSubmit}>Register</button>

        <p>
          Already have an account?{" "}
          <span style={link} onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f5f5f5"
};

const box = {
  padding: "30px",
  background: "white",
  borderRadius: "10px",
  width: "300px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  marginBottom: "10px",
  padding: "8px"
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

const link = {
  color: "blue",
  cursor: "pointer"
};