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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkData = async () => {
      await axios
        .post("/auth", { token: token })
        .then(function (response) {
          console.log("Printed");
          setCheck(1);
          setLoaded(true);
        })
        .catch(function (error) {
          console.log("Wrong");
          setCheck(0);
          setLoaded(true);
        });
    };

    if (token !== "" && token !== undefined) {
      console.log(token);
      checkData();
      // <Dashboard />;
    } else {
      console.log("wwer");
      // setCheck(0);
    }

    console.log(check);
  }, []);

  return (
    <Router>
      {loaded ? (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login">
              {check === 1 ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            <Route exact path="/dashboard">
              {check === 1 ? <Dashboard /> : <Redirect to="/login" />}
            </Route>
            {/* <Route component={NotFoundComponent} /> */}
          </Switch>
        </div>
      ) : (
        <h2>Loading Data</h2>
      )}
    </Router>
  );
}

export default App;
