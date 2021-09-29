import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  let history = useHistory();
  function handleLogin() {
    history.push("/login");
  }
  return (
    <div>
      <h1>Home</h1>
      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Home;
