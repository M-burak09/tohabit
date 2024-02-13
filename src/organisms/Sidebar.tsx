import React from "react";
import Logout from "../molecules/Logout.tsx";
import CreateTask from "./CreateTask.tsx";
import AnchorList from "../atoms/AnchorList.tsx";

const Sidebar = ({refresh, styles}) => {

    return (
        <div className={`${styles} lg:w-1/4 p-4 max-w-xs max-h-screen border-r`}>
            <div className="py-2 flex">
                <img src="logo.webp" alt="logo" className="w-8 h-8 mr-2"/>
                <span className="font-bold text-btnSecondary text-2xl">ToHabit</span>
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
    );
}

export default Sidebar;