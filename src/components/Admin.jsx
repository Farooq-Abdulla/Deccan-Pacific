import { useRecoilState } from "recoil";
import "../App.css";
import { AdminLoginFormData } from "../store/atom/AdminLoginFormData";
import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useRecoilState(AdminLoginFormData);
  const handleInput = useCallback(
    (e) => {
      setLoginData((prevLoginData) => ({
        ...prevLoginData,
        [e.target.name]: e.target.value,
      }));
    },
    [setLoginData]
  );
  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        let res = await axios.post("http://localhost:8000/admin", {
          email: loginData.email,
          password: loginData.password,
        });
        localStorage.setItem("authToken", res.data.token);

        if (res.data.msg === "Success") {
          navigate("/admin/info");
        }
        setLoginData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.log("Error submitting form:", error);
      }
    },
    [loginData]
  );
  return (
    <div>
      <div className="adminLoginPage">
        <h1>Admin Login</h1>
        <div className="adminLoginForm">
          <form onSubmit={submitHandler}>
            <label>
              Username:
              <input
                type="email"
                placeholder="email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleInput}
                required
              />
            </label>
            <br />
            <br />
            <label>
              Password:
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                onChange={handleInput}
                value={loginData.password}
                required
              />
            </label>
            <br />
            <br />
            <button className="SubmitButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
