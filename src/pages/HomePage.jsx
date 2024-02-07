import React from "react";
import Logout from "../molecules/Logout";
import {useState, useEffect} from "react";
import {url} from "../config.js";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks
} from "date-fns";

const HomePage = () =>{
    
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [tasksData, setTasksData] = useState([]);

    useEffect(() => {
        fetchTasksData();
      }, []);
    
    // Go to the previous or next weeks
    const changeWeekHandle = (btnType) => {
      if (btnType === "prev") {
        setCurrentMonth(subWeeks(currentMonth, 1));
        setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
      }
      if (btnType === "next") {
        setCurrentMonth(addWeeks(currentMonth, 1));
        setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
      }
    };
    
    // Header which contains previous and next buttons and the calendar date title
    const showHeader = () => {
      const dateFormat = "MMM yyyy";
      
      return (
        <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => changeWeekHandle("prev")}>
            previous week
          </div>
        </div>
        <div className="col col-center">
            <p>{format(currentMonth, dateFormat)}</p>
            <p> Week {currentWeek}</p>
          </div>
        <div className="col col-end" onClick={() => changeWeekHandle("next")}>
          <div className="icon">next week</div>
        </div>
      </div>
          
      );
    };

    // Shows row with monday to sunday
    const showWeekdayTitle = () => {
      const dateFormat = "EEE";
      const days = [];
      let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
      for (let i = 0; i < 7; i++) {
        days.push(
          <div className="col col-center" key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
        );
      }
      return <div className="days row">{days}</div>;
    };

    // Shows rows of the days of the current week in which the tasks are displayed
    const showDateTitle = () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = "yyyy-MM-dd";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                tasksData.map((data) => {
                    data.map((task) => {
                        if(task.date == formattedDate){
                            days.push(
                                <div className="flex border" key={task.id}>
                                <input type="checkbox" />
                                <p>{task.title}</p>
                                <img src={task.image} alt={task.image} />
                            </div>
                                );
                        }
                    })
                })
                day = addDays(day, 1);
            }
            rows.push(<div className="row" key={day}>{days}</div>);
            days = [];
        }
        return <div className="body">{rows}</div>;
    };

    // Chatgpt code that i needed to add to fix object problem, but lost track of it after coding. Need to take a look again do understand this function well
    const fetchTasksData = async () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = 'yyyy-MM-dd';
        const promises = [];

        let day = startDate;
        while (day <= endDate) {
            const formattedDate = format(day, dateFormat);
            promises.push(handleUserTodosByDate(formattedDate));
            promises.push(handleUserHabitsByDate(formattedDate));
            day = addDays(day, 1);
        }

        const data = await Promise.all(promises);
        const filteredData = data.filter((item) => item !== undefined);
        setTasksData(filteredData); 
    };

    // Fetches json data user todos on a specific date
    const handleUserTodosByDate = async (date) => {
        let res = await fetch(url.rest + "user/todos/" + sessionStorage.getItem("current_user") + "/" + date);
        if (res.status === 200) {
            const data = await res.json();
            return data;
        }   
    }  

    // Fetches json data user habits on a specific date
    const handleUserHabitsByDate = async (date) => {
        let res = await fetch(url.rest + "user/habits/" + sessionStorage.getItem("current_user") + "/" + date);
        if (res.status === 200) {
            const data = await res.json();
            console.log(data)
            return data;
        }   
    }  

    return(
        <div>
            <h1>Homepage</h1>
            <Logout/>
            
            <div className="calendar">
                {showHeader()}
                {showWeekdayTitle()}
                {showDateTitle()}
            </div>
        </div>
    )
}
export default HomePage;