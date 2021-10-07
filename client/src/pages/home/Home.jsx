import React from "react";
import Logout from "../logout/Logout";
import "./home.css";

// for showing after login small page
export default function Home() {
  return (
    <div className="homeContainer">
      <h1 className="header">Home</h1>
      <Logout />
    </div>
  );
}
