import React from "react";
import Sidebar from "../organisms/Sidebar.tsx";
import CreateTask from "../organisms/CreateTask.tsx";
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
    const [tasksData, setTasksData] = useState<Record<string, any>>([]);

    // Updates taskdata everytime the week changes
    useEffect(() => {
        fetchTasksData();
      }, [currentMonth]);
    
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
        <div className="flex justify-between bg-primary p-3 border-b w-full">
        <div className="">
          <div className="" onClick={() => changeWeekHandle("prev")}>
            <img src="previous.png" alt="Previous week" className="w-8 cursor-pointer mt-2"/>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold"> Tasks of week {currentWeek}</p>
          <p>{format(currentMonth, dateFormat)}</p>
            
          </div>
        <div className="" onClick={() => changeWeekHandle("next")}>
        <img src="next.png" alt="Next week" className="w-8 cursor-pointer mt-2"/>
        </div>
      </div>
          
      );
    };

    // Shows row with monday to sunday
    const showWeekdayTitle = () => {
      const weekDayFormat = "EEE";
      const dateFormat = "dd-MM";
      const days: JSX.Element[] = [];
      let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
      let day = startDate;

      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        days.push(
          <div className="grow basis-0 text-center bg-primary border-b font-bold py-2 border-r" key={i}>
            <span> {format(addDays(startDate, i), weekDayFormat)} </span>
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      return <div className="flex">{days}</div>;
    };

    // Shows rows of the days of the current week in which the tasks are displayed
    const showDateTitle = () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = "yyyy-MM-dd";
        const rows: JSX.Element[] = [];
        let days: JSX.Element[] = [];
      
        let day = startDate;
        while (day <= endDate) {
          const formattedDate = format(day, dateFormat);
          const dayTasks = tasksData
            .flat()
            .filter((task) => task.date === formattedDate)
            .map((task) => (
              <div className="flex bg-primary rounded p-2 my-2 mx-1" key={task.id}>
                <input type="checkbox" className="mx-2"/>
                <p>{task.title}</p>
                <img src={task.image} alt={task.image} className="w-5 h-5 my-auto ml-auto"/>
              </div>
            ));
      
          days.push(
            <div className="col " key={formattedDate}>
              {dayTasks}
            </div>
          );
      
          day = addDays(day, 1);
        }
      
        rows.push(<div className="flex" key="dates">{days}</div>);
      
        return <div className="">{rows}</div>;
      };

    // Function that makes sure that the fetches are handled well with promises and saved in the tasksdata state
    const fetchTasksData = async () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = 'yyyy-MM-dd';
        const promises: Promise<any>[] = [];

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
        <div className="lg:flex w-full">
            <Sidebar styles="" refresh={fetchTasksData}/>
            <div className="lg:w-full bg-secondary overflow-y-auto h-screen">
              
              <div className="calendar">
                  {showHeader()}
                  {showWeekdayTitle()}
                  {showDateTitle()}
              </div>
            </div>
        </div>
    )
}
export default HomePage;