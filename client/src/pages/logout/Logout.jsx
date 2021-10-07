import React from "react";
import { useHistory } from "react-router";
import "./logout.css";

function Logout() {
  // used to push specified page
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <div className="logout">
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
