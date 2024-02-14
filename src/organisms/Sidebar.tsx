import React from "react";
import Logout from "../molecules/Logout.tsx";
import CreateTask from "./CreateTask.tsx";
import AnchorList from "../atoms/AnchorList.tsx";
import { useState } from "react";

const Sidebar = ({refresh, styles}) => {

    const [toggle, setToggle] = useState(true);

    const toggleSidebar = () => {
        const sidebar = document.getElementById("sidebar");
        const sidebarOpen = document.getElementById("sidebar-open");
        const sidebarClosed = document.getElementById("sidebar-closed");
        if(toggle === true){
            setToggle(false);
            sidebarOpen.classList.add("hidden");
            sidebarClosed.classList.remove("hidden");
            sidebar.classList.remove("sidebar");
        } else {
            setToggle(true);
            sidebarOpen.classList.remove("hidden");
            sidebarClosed.classList.add("hidden");
            sidebar.classList.add("sidebar");
        }
    }

    return (
        <div id="sidebar" className={`${styles} sidebar border-r`}>
            <div id="sidebar-open">
                <div  className="px-4 pt-6 pb-2 flex">
                    <img src="logo.webp" alt="logo" className="w-8 h-8 mr-2"/>
                    <span className="font-bold text-btnSecondary text-2xl">ToHabit</span>
                    <img src="close.png" alt="close" className="w-9 h-9 cursor-pointer ml-auto" onClick={toggleSidebar}/>
                </div>
                <hr className="my-2"></hr>
                <ul>
                    <CreateTask refresh={refresh}/>
                    <Logout/>
                    <AnchorList href="/"> Week planning </AnchorList>
                    <AnchorList href="/edit"> Edit tasks </AnchorList>
                    <AnchorList href="/statistics"> Statistics </AnchorList>
                </ul>
            </div>
            <div id="sidebar-closed" className="hidden">
                <img src="hamburger.png" alt="close" className="w-6 h-7 cursor-pointer m-6" onClick={toggleSidebar}/>  
                <hr></hr> 
                <ul className="hidden lg:block">
                    <AnchorList href="/"> <img src="planning.png" alt="Week planning" className="w-7 h-7 ml-1.5 my-2" /> </AnchorList>
                    <AnchorList href="/edit"> <img src="edit.png" alt="Edit tasks" className="w-7 h-7 ml-2 my-2" /> </AnchorList>
                    <AnchorList href="/statistics"> <img src="statistic.png" alt="Statistics" className="w-7 h-7 ml-1 my-2" /> </AnchorList>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;