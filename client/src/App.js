import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
// import NotFoundComponent from "./pages/NotFoundComponent";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [check, setCheck] = useState(0);

  async function checkToken() {
    if (token !== "" && token !== undefined) {
      // console.log(token);

      await axios
        .post("/auth", { token: token })
        .then(function (response) {
          console.log("Printed");
          return <Dashboard />;
        })
        .catch(function (error) {
          return <Redirect to="/login" />;
        });
    } else {
      return <Redirect to="/login" />;
    }
  }

  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  //   if (token == undefined) {
  //     setToken("");
  //   }
  // }, [localStorage.getItem("token")]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard">
            {checkToken()}
          </Route>
          {/* <Route component={NotFoundComponent} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
