import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, updateFormData] = useState({});

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post("/api/register", formData)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard";
      })
      .catch(function (error) {
        console.log(error);
        let op = document.getElementById("message");
        op.innerText = error.message;
      });
  };

  return (
    <div>
      <h1>Register/Login Here</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <label>
        Email ID
        <input type="email" name="email" onChange={handleChange}></input>
      </label>

      <br />

      <label>
        Password
        <input type="password" name="password" onChange={handleChange}></input>
      </label>

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {/* </form> */}
      <br />
      <br />
      <p className="message" id="message"></p>
    </div>
  );
}

export default Login;
