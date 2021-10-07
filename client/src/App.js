import React from "react";
import Login from "./pages/login/Login";
import Singup from "./pages/signup/Singup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewPassword from "./pages/new/NewPassword";
import Reset from "./pages/reset/Reset";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/register" component={Singup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/new-password" component={NewPassword}></Route>
          <Route path="/reset-password" component={Reset}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
