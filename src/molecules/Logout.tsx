import React from "react";
import Button from "../atoms/Button.tsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    let handleLogout = () => {
        sessionStorage.removeItem("current_user");
        navigate("/login");
    }
    return (
        <div className="p-2">
            <Button onClick={handleLogout} styles="">Logout</Button>
        </div>
    )
}

export default Logout;