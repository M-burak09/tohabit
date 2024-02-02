/*import React, { useState, useEffect } from 'react';

const App = props => {

  const [user, setUser] = useState(props.user)

  const submit = e => {
    e.preventDefault()
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => setUser(json.user))
  }

  const [posts, setPosts] = useState([]);
  const url = 'http://localhost/educom/tohabit/server/restapi/task/all';
  
   useEffect(() => {
      fetch(url)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log("Fetch error:", err);
         });
   }, []);

  return (
    <div className="App">
      <h1>{JSON.stringify(posts[0])}</h1>
      

      
    </div>
  );
}



export default App;*/

import { useState } from "react";

function App() {
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
      console.log(await res.text());
      if (res.status === 200) {
        
        //console.log(username, password, res.json());
        const data = await res.json();
        console.log('Login successful:', data);
        setUsername("");
        setPassword("");
        setMessage("User created successfully");
      } else {
      
        const errorData = await res.json();
        console.error('Login failed:', errorData);
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log('err');
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

export default App;
