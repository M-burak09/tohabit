import React from "react";
import Logout from "../molecules/Logout";
import {useState, useEffect} from "react";

function HomePage(){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        handleUserTasks();
    }, []);

    let handleUserTasks = async () => {
        try {
            let res = await fetch("http://localhost/educom/tohabit/server/restapi/user/todos/" + sessionStorage.getItem("current_user"));
            if (res.status === 200) {
              const data = await res.json();
              setTasks(data);
            } else {
              const errorData = await res.json();
              console.error('Failed to get data:', errorData);
            }
          } catch (err) {
            console.log(err);
          }
    }

    return(
        <div>
            <h1>Homepage</h1>
            <Logout/>
            {tasks.map((data) => {
                return(
                    // This is test code to show all tasks. The next step will be categorising the dates
                    <div className="flex border">
                        <input type="checkbox" />
                        <p>{data.title}</p>
                        <img src={data.image} alt={data.image} />
                    </div>
                )
            })}
            
        </div>
    )
}
export default HomePage;