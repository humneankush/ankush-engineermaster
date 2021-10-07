import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./newpassword.css";

function NewPassword() {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const [password1, setPasword1] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);

  const PostData = async (e) => {
    e.preventDefault();
    if (password !== password1) {
      setError(true);
    } else {
      try {
        const res = await axios.post("/auth/new-password", {
          email,
          password,
        });

        res.data && history.push("/login");
        console.log(res.data);
      } catch (error) {
        setError(true);
      }
    }
  };

  return (
    <div className="new">
      <div className="newForm">
        <h2 className="newTitle">newpassword</h2>
        <input
          className="input"
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="enter a new password"
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="enter a new password"
          value={password1}
          onChange={(e) => setPasword1(e.target.value)}
        />
        <button className="newButton " onClick={(e) => PostData(e)}>
          Update password
        </button>
        {error && <span>password didnot match</span>}
      </div>
    </div>
  );
}

export default NewPassword;
