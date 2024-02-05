
import React from "react";
import Button from "../atoms/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost/educom/tohabit/server/restapi/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        if(data.success === true){
          console.log(data.user.id);
          sessionStorage.setItem("current_user", data.user.id);
          console.log(sessionStorage.getItem("current_user"));
          navigate("/");
          setUsername("");
          setPassword("");
        } else {
          console.error('Login failed:', data);
          setMessage("Username or password doesn't exist, please try again!");
        }
      } else {
        const errorData = await res.json();
        console.error('Login failed:', errorData);
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleSubmit}>Create</Button>

        <p className="message">{message ? <p>{message}</p> : null}</p>
        <p>{sessionStorage.getItem("current_user")}</p>
      </form>
    </div>
  );
}

export default Login;
