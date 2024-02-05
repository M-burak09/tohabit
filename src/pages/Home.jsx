import React from "react";
import Logout from "../molecules/Logout";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home(){
    const [logoutTriggered, setLogoutTriggered] = useState(false);
    const navigate = useNavigate();

    let handleLogout = () => {
        sessionStorage.removeItem("current_user");
        setLogoutTriggered(true);
        navigate("/login");
    }
    
    return(
        <div>
            <h1>Homepage</h1>
            <Logout></Logout>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default Home;