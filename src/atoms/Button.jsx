import React from "react";

const Button = ({onClick, styles, children}) =>{
    return(
        <button onClick={onClick} className={`${styles}`}>{children}</button>
    )
}

export default Button;