
import React from "react";
import Button from "../atoms/Button.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../config.js";
import { useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  // useeffect needed to avoid navigate bug in which it stays at login sometimes
  useEffect(() => {
    if (sessionStorage.getItem("current_user")) {
      navigate("/");
    }
  }, []);

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
          setUsername("");
          setPassword("");
          navigate("/");
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
      <div className="lg:flex w-full h-screen bg-secondary">
        <div className="hidden lg:block lg:h-screen lg:w-1/2 lg:relative">
          <img src="background.jpg" alt="Background" className="h-full w-full backdrop-blur-[2px]"></img>
          <div className="backdrop-blur-[2px] absolute left-1/2 top-0 -translate-x-1/2 w-full h-full">
          <div className="text-textSecondary rounded-lg py-8 w-2/3 m-auto lg:mt-24 2xl:mt-48">
            <h1 className="text-3xl font-bold mx-4 mb-8">Welcome to ToHabit – Your Personal Environment for Positive Change!</h1>
            <p className="text-lg mx-4 mb-6">Unlock the door to a more productive lifestyle. Start building positive habits, achieve your goals, and transform your life journey with ToHabit. </p>
            <p className="text-lg mx-4">Join us on the path to a better you!</p>
          </div>
          </div>
        </div>
        <div className="relative lg:h-full lg:w-1/2 lg:m-auto ">
          <form className="bg-primary w-full md:w-2/3 md:h-1/2 pt-32 md:pt-8 md:top-0 md:translate-y-1/2 h-screen m-auto px-4 shadow-[0_4px_10px_rgba(0,0,0,0.1)] lg:rounded py-8 block lg:w-1/2 lg:h-fit lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-8" onSubmit={handleSubmit}>
            <h1 className="text-center text-textPrimary text-2xl font-bold mb-4 mt-8 lg:mt-0">Login to your account!</h1>
            <input
              className="w-full box-border rounded border border-tertiary px-3 py-2 my-2"
              type="text"
              value={username}
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="block w-full m-auto rounded border border-tertiary px-3 py-2 my-2"
              type="text"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button onClick={handleSubmit} styles="block w-2/3 m-auto rounded bg-btnPrimary text-textSecondary px-3 py-2 mb-2 mt-8 hover:bg-btnSecondary">Login</Button>
            <div className="p-4 text-center">
              <p className="text-red-500">{message ? <p>{message}</p> : null}</p>
              <p className="text-center text-textPrimary italic">Test account: Username & password = guest</p>
              <p>{sessionStorage.getItem("current_user") !== null ? sessionStorage.getItem("current_user") + " logged in successfully. If this text appears, go to the homepage by removing /login in the url" : ""} </p>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;
