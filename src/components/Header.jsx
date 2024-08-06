import { useNavigate } from "react-router-dom";
import "../App.css";
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
