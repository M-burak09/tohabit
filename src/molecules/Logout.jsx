import React from "react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    let handleLogout = () => {
        sessionStorage.removeItem("current_user");
        navigate("/login");
    }
    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}

export default Logout;