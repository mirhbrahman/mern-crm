import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Components
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import AppRoute from "./components/util/AppRoute";
import HomeRoute from "./components/util/HomeRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <HomeRoute exact path="/register" component={Register} />
          <HomeRoute exact path="/login" component={Login} />
          <div className="index-page sidebar-collapse">
            <AppRoute exact path="/dashboard" component={Dashboard} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
