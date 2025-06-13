"use client";
import {useNavigate} from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/favorites")}> Favorites </button>
      <button onClick={() => navigate("/watch")}> Watched </button>
    </aside>
  );
}
