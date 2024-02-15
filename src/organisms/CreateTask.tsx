import React from "react";
import Button from "../atoms/Button.tsx";
import {useState} from "react";
import {url} from "../config.js";

const CreateTask = ({refresh}) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [todoModalOpen, setTodoModalOpen] = useState(false);
    const [habitModalOpen, setHabitModalOpen] = useState(false);
    const [todoName, setTodoName] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todoDate, setTodoDate] = useState("");
    const [habitName, setHabitName] = useState("");
    const [habitDescription, setHabitDescription] = useState("");
    //const [habitDay, setHabitDay] = useState("");
    const [habitDate, setHabitDate] = useState("");
    const [habitEndDate, setHabitEndDate] = useState("");
    

    
    const showCreateModal = () => {
        setCreateModalOpen(true);
    };

    const hideCreateModal = () => {
        setCreateModalOpen(false);
    };

    const showTodoModal = () => {
        setTodoModalOpen(true);
        setCreateModalOpen(false);
    };

    const hideTodoModal = () => {
        setTodoModalOpen(false);
    };

    const showHabitModal = () => {
        setHabitModalOpen(true);
        setCreateModalOpen(false);
    };

    const hideHabitModal = () => {
        setHabitModalOpen(false);
    };

    let handleTodoSubmit = async () => {
        
        try {
          const response = await fetch(url.rest + "create/todo/" + sessionStorage.getItem("current_user"), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: todoName,
              description: todoDescription,
              date: todoDate
            }),
          });
          const data = await response.text();
          console.error("Error:", data);
          if (response.ok) {
            const data = await response.json();
            console.log("Success:", data);
          } else {
            console.error("Error:", response.statusText);
          }
            setTodoName("");
            setTodoDescription("");
            setTodoDate("");
            refresh();
            hideTodoModal();
          
        } catch (err) {
          console.log(err);
        }
      };

      let handleHabitSubmit = async () => {

        const habit = {
            name: habitName,
            description: habitDescription,
            //dayOfWeek: habitDay,
            startDate: habitDate,
            endDate: habitEndDate
        }
        
        try {
          const response = await fetch(url.rest + "create/habit/" + sessionStorage.getItem("current_user"), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(habit),
          });
          const data = await response.text();
          console.error("Error:", data);
          if (response.ok) {
            //const data = await response.json();
            //console.log("Success:", data);
          } else {
            console.error("Error:", response.statusText);
          }
            setHabitName("");
            setHabitDescription("");
            setHabitDate("");
            setHabitEndDate("");
            //setHabitDay("");
            refresh();
            hideHabitModal();   
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div>
            <Button onClick={showCreateModal} styles="rounded bg-btnPrimary text-textSecondary px-3 py-2 my-2  mx-4 hover:bg-btnSecondary">Create task +</Button>
            {createModalOpen && (
                <div className="bg-black/75 w-full h-screen fixed top-0 left-0">
                    <div className="bg-primary fixed  h-auto w-full lg:w-1/4 sm:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4">
                        <p className="text-center text-lg font-bold mb-4">Pick a task type</p>
                        <Button onClick={showTodoModal} styles="rounded bg-btnPrimary w-full text-primary px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary">Create todo (single task) </Button>
                        <Button onClick={showHabitModal} styles="rounded bg-btnPrimary w-full text-primary px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary">Create habit (reoccuring task)</Button>
                        <Button onClick={hideCreateModal} styles="rounded bg-gray-300 w-full  px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary hover:text-primary">Cancel task</Button>
                    </div>
                </div>
            )}

            {todoModalOpen && (
                <div className="bg-black/75 w-full h-screen fixed top-0 left-0">
                    <div className="bg-primary fixed  h-auto w-full xl:w-2/5 2xl:w-1/3 sm:w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4">
                        <p className="text-center text-lg font-bold"> Create todo task</p>
                        <div className="lg:flex mt-4">
                            <label htmlFor="todoName" className="lg:px-3 lg:w-1/3 lg:mt-4">Title:</label>
                            <input
                                id="todoName"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="text"
                                value={todoName}
                                placeholder="ex. Reading"
                                onChange={(e) => setTodoName(e.target.value)}
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            <label htmlFor="todoDescription" className="lg:px-3 lg:w-1/3 lg:mt-4">Description:</label>
                            <input
                                id="todoDescription"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="text"
                                value={todoDescription}
                                placeholder="ex. Read 5 pages of a book"
                                onChange={(e) => setTodoDescription(e.target.value)}
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            <label htmlFor="todoDate" className="lg:px-3 lg:w-1/3 lg:mt-4">Date:</label>
                            <input
                                id="todoDate"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="date"
                                value={todoDate}
                                onChange={(e) => setTodoDate(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Button onClick={hideTodoModal} styles="rounded bg-gray-300 w-full  px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary hover:text-primary">Cancel task</Button>
                            <Button onClick={handleTodoSubmit} styles="block w-full m-auto rounded bg-tertiary text-primary px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary">Create task</Button>
                        </div>
                    </div>
                </div>
            )}

            {habitModalOpen && (
                <div className="bg-black/75 w-full h-screen fixed top-0 left-0">
                    <div className="bg-primary fixed  h-auto w-full xl:w-2/5 2xl:w-1/3 sm:w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4">
                        <p className="text-center text-lg font-bold">Create habit task</p>
                        <div className="lg:flex mt-4">
                            <label htmlFor="habitName" className="lg:px-3 lg:w-1/3 lg:mt-4">Title:</label>
                            <input
                                id="habitName"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="text"
                                value={habitName}
                                placeholder="Task name"
                                onChange={(e) => setHabitName(e.target.value)}
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            <label htmlFor="habitDescription" className="lg:px-3 lg:w-1/3 lg:mt-4">Description :</label>
                            <input
                                id="habitDescription"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="text"
                                value={habitDescription}
                                placeholder="Task description"
                                onChange={(e) => setHabitDescription(e.target.value)}
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            <label htmlFor="startDate" className="lg:px-3 lg:w-1/3 lg:mt-4">Starting date:</label>
                            <input
                                id="startDate"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="date"
                                value={habitDate}
                                placeholder="Task start date"
                                onChange={(e) => setHabitDate(e.target.value)}
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            <label htmlFor="EndDate" className="lg:px-3 lg:w-1/3 lg:mt-4">End date:</label>
                            <input
                                id="endDate"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="date"
                                value={habitEndDate}
                                placeholder="Task end date"
                                onChange={(e) => setHabitEndDate(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Button onClick={hideHabitModal} styles="rounded bg-gray-300 w-full px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary hover:text-primary">Cancel task</Button>
                            <Button onClick={handleHabitSubmit} styles="block w-full m-auto rounded bg-tertiary text-primary px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary">Create task</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTask;