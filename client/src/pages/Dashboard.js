import React from "react";
import { useHistory } from "react-router-dom";

function Dashboard() {
  let history = useHistory();

  function handleLogout() {
    localStorage.removeItem("token");
    // history.push("/");
  }

  return (
    <div>
      Dashboard - Limited access to users with credentials.
      <br />
      <br />
      <a href="/login">
        <button onClick={handleLogout}>Logout</button>
      </a>
    </div>
  );
}

export default Dashboard;
