
import React from "react";
import { useState } from "react";

function Login() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
      //let resJson = await res.json();
      //console.log(await res.text());
      if (res.status === 200) {
        const data = await res.json();
        if(data.success === true){
          console.log(data.success);
          setUsername("");
          setPassword("");
          setMessage("User created successfully");
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

        <button onClick={handleSubmit}>Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default Login;
