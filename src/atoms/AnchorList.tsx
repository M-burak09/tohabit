import React from "react";

const AnchorList = ({href, children}) =>{
    return(
        <a href={href}> <li className="py-2 px-4 hover:bg-btnSecondary hover:text-primary"> {children} </li></a>
    )
}

export default AnchorList;