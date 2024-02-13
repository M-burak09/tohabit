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
    const [habitDay, setHabitDay] = useState("");
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
          await fetch(url.rest + "create/todo/" + sessionStorage.getItem("current_user"), {
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
            dayOfWeek: habitDay,
            startDate: habitDate,
            endDate: habitEndDate
        }
        
        try {
          await fetch(url.rest + "create/habit/" + sessionStorage.getItem("current_user"), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(habit),
          })
            setHabitName("");
            setHabitDescription("");
            setHabitDate("");
            setHabitEndDate("");
            setHabitDay("");
            refresh();
            hideHabitModal();   
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div>
            <Button onClick={showCreateModal} styles="rounded bg-btnPrimary text-textSecondary px-3 py-2 my-2  hover:bg-btnSecondary">Create Task +</Button>

            {createModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Create modal</p>
                        <Button onClick={showTodoModal} styles="">Create todo (single task) </Button>
                        <Button onClick={showHabitModal} styles="">Create habit (reoccuring task)</Button>
                        <Button onClick={hideCreateModal} styles="">Close</Button>
                    </div>
                </div>
            )}

            {todoModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p> Todo modal</p>
                        <Button styles="" onClick={hideTodoModal}>Close</Button>
                        <input
                            className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
                            type="text"
                            value={todoName}
                            placeholder="Task name"
                            onChange={(e) => setTodoName(e.target.value)}
                        />
                        <input
                            className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
                            type="text"
                            value={todoDescription}
                            placeholder="Task name"
                            onChange={(e) => setTodoDescription(e.target.value)}
                        />
                        <input
                            className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
                            type="date"
                            value={todoDate}
                            placeholder="Task name"
                            onChange={(e) => setTodoDate(e.target.value)}
                        />
                        <Button onClick={handleTodoSubmit} styles="block w-2/3 m-auto rounded bg-tertiary px-3 py-2 my-2 text-sm font-medium">Create task</Button>
                    </div>
                </div>
            )}

            {habitModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Habit modal</p>
                        <Button onClick={hideHabitModal} styles="">Close</Button>
                        <input
                            className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
                            type="text"
                            value={habitName}
                            placeholder="Task name"
                            onChange={(e) => setHabitName(e.target.value)}
                        />
                        <input
                            className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
                            type="text"
                            value={habitDescription}
                            placeholder="Task name"
                            onChange={(e) => setHabitDescription(e.target.value)}
                        />
                        <input
                            className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
                            type="number"
                            value={habitDay}
                            placeholder="Task name"
                            onChange={(e) => setHabitDay(e.target.value)}
                        />
                        <input
                            className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
                            type="date"
                            value={habitDate}
                            placeholder="Task name"
                            onChange={(e) => setHabitDate(e.target.value)}
                        />
                        <input
                            className="block w-2/3 m-auto rounded border-0 bg-transparent px-3 py-2 my-2"
                            type="date"
                            value={habitEndDate}
                            placeholder="Task name"
                            onChange={(e) => setHabitEndDate(e.target.value)}
                        />
                        <Button onClick={handleHabitSubmit} styles="block w-2/3 m-auto rounded bg-tertiary px-3 py-2 my-2 text-sm font-medium">Create task</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTask;