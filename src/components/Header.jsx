import { useCallback } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
export function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navbar">
        <div onClick={()=>navigate("/")} className="logo">
          <i>Deccan Pacific</i>
        </div>
        <div className="navbar-Right">
          <div onClick={() => navigate("/")}>Home</div>
          <div onClick={() => navigate("/About")}>About</div>
          <div onClick={() => navigate("/services")}>Services</div>
          <div onClick={() => navigate("/contactUs")}>Contact Us</div>
        </div>
        <div className="admin">
          <div onClick={() => navigate("/admin")}>Admin Login</div>
        </div>
      </div>
    </div>
  );
}
