
import React from "react";
import Button from "../atoms/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../config.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(url.rest + "login", {
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
          
          await sessionStorage.setItem("current_user", data.user.id);
          console.log(sessionStorage.getItem("current_user"));
          // Need to fix bug where it sometimes goes to home but sometimes stays at login
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
      <form className="bg-secondary w-full  max-w-3xl h-screen m-auto lg:rounded py-8 lg:w-1/2 lg:h-fit lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2" onSubmit={handleSubmit}>
        <h1 className="text-center text-primary">Login</h1>
        <p className="text-center text-primary italic">Test account: Username & password = guest</p>
        <input
          className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
          type="text"
          value={username}
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleSubmit} styles="block w-2/3 m-auto rounded bg-tertiary px-3 py-2 my-2 text-sm font-medium">Login</Button>

        <p className="message">{message ? <p>{message}</p> : null}</p>
        <p>{sessionStorage.getItem("current_user")}</p>
      </form>
  );
}

export default Login;
