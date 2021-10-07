import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Singup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setmobNo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState(false);
  const [match, setMatch] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    var emailValid = false;
    if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      setEmailError("Email is minimum 6 character");
    } else if (email.indexOf("") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else {
      setEmailError("");
      emailValid = true;
    }
    var passwordValid = false;
    if (password.length === 0) {
      setPasswordError("password is required");
    } else if (email.length < 6) {
      setEmailError("password is minimum 6 character");
    } else if (email.indexOf("") >= 0) {
      setEmailError("password cannot contain spaces");
    } else {
      setEmailError("");
      passwordValid = true;
    }
    setError(false);
    if (passwordAgain !== password) {
      setMatch(true);
    } else {
      if (emailValid && passwordValid) {
        try {
          const res = await axios.post("/auth/register", {
            username,
            email,
            mobNo,
            password,
          });
          res.data && window.location.replace("/login");
        } catch (error) {
          setError(true);
        }
      }
    }
  };

  return (
    <div className="register">
      <span className="registerTiltle">Register</span>

      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="enter username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="enter email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError.length > 0 && alert({ emailError })}

        <label htmlFor="conact">Contact</label>
        <input
          type="text"
          placeholder="enter contact"
          required
          onChange={(e) => setmobNo(e.target.value)}
          minLength="10"
          maxlength="12"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError.length > 0 && alert({ passwordError })}
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          placeholder="enter password"
          required
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
        <button className="registerButton">Register</button>
      </form>

      <Link to="/login">
        <h6 className="link"> already have an account login</h6>
      </Link>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
      {match && (
        <span style={{ color: "red", marginTop: "10px" }}>
          password didnt match
        </span>
      )}
    </div>
  );
}
