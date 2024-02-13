import React from "react";

const AnchorList = ({href, children}) =>{
    return(
        <a href={href}> <li className="p-2"> {children} </li></a>
    )
}

export default AnchorList;