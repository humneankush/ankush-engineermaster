import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Reset() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const postData = () => {
    try {
      axios.post("/auth/reset-password", {
        email,
      });
      history.push("/login");
    } catch (error) {}
  };

  return (
    <div className="reset">
      <div className="resetForm">
        <h2 className="resetTitle">reset</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="resetButton" onClick={() => postData()}>
          reset password
        </button>
      </div>
    </div>
  );
}

export default Reset;
