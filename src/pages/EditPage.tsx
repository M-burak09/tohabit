import React from "react";
import { useState, useEffect } from "react";
import { url } from "../config";
import Button from "../atoms/Button.tsx";
import Sidebar from "../organisms/Sidebar.tsx";
import { set } from "date-fns";

const EditPage = ({refresh}) => {

  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState([]);

  useEffect(() => {
      handleUserTasks();
  }, []);

  const showTaskModal = (data) => {
    setTaskModalOpen(true);
    setCurrentTask(data);
    setTaskId(data.id);
    setTaskName(data.title);
    setTaskDescription(data.description);
};

const hideTaskModal = () => {
    setTaskModalOpen(false);
};

  const handleUserTasks = async () => {
    try {
        let res = await fetch(url.rest + "tasks/" + sessionStorage.getItem("current_user"));
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


let handleTaskSubmit = async () => {
        
  try {
    const response = await fetch(url.rest + "edit/task/" + sessionStorage.getItem("current_user"), {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: taskId,
        name: taskName,
        description: taskDescription,
      }),
    });
    //const data = await response.text();
    //console.error("Error:", data);
    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
    } else {
      console.error("Error:", response.statusText);
    } 
      setTaskId("");
      setTaskName("");
      setTaskDescription("");
      handleUserTasks();
      hideTaskModal();
      
    
  } catch (err) {
    console.log(err);
  }
};

  return (
        <div className="h-screen lg:flex w-full">
            <Sidebar styles="" />
            <div className="w-full bg-secondary">
              <h1 className="w-1/2 m-auto max-w-3xl text-xl font-bold mt-6 mb-4">Edit tasks</h1>
              {tasks.map((data) => {
                  return(
                      <div className="flex justify-between sm:w-1/2 max-w-3xl mx-2 sm:mx-auto bg-primary rounded p-2 my-2" key={data.id}>
                          <p>{data.title}</p>
                          <Button onClick={() => showTaskModal(data)} styles="block rounded bg-btnPrimary text-textSecondary px-3 py-0 hover:bg-btnSecondary">Edit</Button>
                      </div>
                  )
              })}
            </div>
            {taskModalOpen && (
                <div className="bg-black/75 w-full h-screen fixed top-0 left-0">
                    <div className="bg-primary fixed  h-auto w-full xl:w-2/5 2xl:w-1/3 sm:w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4">
                        <p className="text-center text-lg font-bold"> Edit task</p>
                        <div className="lg:flex mt-4">
                            <label htmlFor="todoName" className="lg:px-3 lg:w-1/3 lg:mt-4">Title:</label>
                            <input
                                id="todoName"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="text"
                                value={taskName}
                                placeholder="ex. Reading"
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            <label htmlFor="todoDescription" className="lg:px-3 lg:w-1/3 lg:mt-4">Description:</label>
                            <input
                                id="todoDescription"
                                className="block w-full m-auto rounded border bg-transparent px-3 py-2 my-2"
                                type="text"
                                value={taskDescription}
                                placeholder="ex. Read 5 pages of a book"
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Button onClick={hideTaskModal} styles="rounded bg-gray-300 w-full  px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary hover:text-primary">Cancel task</Button>
                            <Button onClick={handleTaskSubmit} styles="block w-full m-auto rounded bg-tertiary text-primary px-3 py-2 my-2 text-sm font-medium hover:bg-btnSecondary">Update task</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditPage;