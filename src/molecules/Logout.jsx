import React from "react";
import Button from "../atoms/Button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [logoutTriggered, setLogoutTriggered] = useState(false);
    const navigate = useNavigate();

    let handleLogout = () => {
        sessionStorage.removeItem("current_user");
        setLogoutTriggered(true);
        navigate("/login");
    }
    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}

export default Logout;