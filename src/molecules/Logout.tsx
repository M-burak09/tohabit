import React from "react";
import Button from "../atoms/Button.tsx";
import { useNavigate } from "react-router-dom";

const Logout = ({children}) => {
    const navigate = useNavigate();

    let handleLogout = () => {
        sessionStorage.removeItem("current_user");
        navigate("/login");
    }
    return (
        <div className="">
            <Button onClick={handleLogout} styles="w-full text-left py-2 px-4 hover:bg-btnSecondary hover:text-primary">Logout</Button>
        </div>
    )
}

export default Logout;