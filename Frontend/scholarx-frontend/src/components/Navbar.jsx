import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={nav}>
      <h2>ScholarX</h2>
      <button onClick={logout} style={btn}>Logout</button>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  background: "#1e293b",
  color: "white",
  alignItems: "center"
};

const btn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer"
};