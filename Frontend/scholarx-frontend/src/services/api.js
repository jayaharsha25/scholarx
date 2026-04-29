import axios from "axios";

const API = axios.create({
  baseURL: "https://scholarx-backend-48t0.onrender.com/api"
});

// 🔥 attach user id automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?._id) {
    req.headers.userid = user._id;
  }

  return req;
});

export default API;