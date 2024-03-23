import { useRecoilState } from "recoil";
import "../App.css";
import { AdminLoginFormData } from "../store/atom/AdminLoginFormData";
import { useCallback } from "react";
export default function Admin() {
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
      console.log(loginData);
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
