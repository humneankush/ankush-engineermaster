import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  // ref hook for input
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email: emailRef.current.value,
        mobNo: emailRef.current.value,
        password: passwordRef.current.value,
      });

      res.data && window.location.replace("/");
    } catch {
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTiltle">Login</span>

      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">email or MobNo</label>
        <input type="text" placeholder="enter email" required ref={emailRef} />

        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="enter password"
          required
          ref={passwordRef}
        />
        <button className="loginButton">Login</button>
      </form>

      <div className="link">
        <Link to="/register">
          <h6 className="h1">not having account</h6>
        </Link>
        <Link to="/new-password">
          <h6>forget password</h6>
        </Link>
      </div>

      {error && <span>check your email or and password</span>}
    </div>
  );
};

export default Login;
