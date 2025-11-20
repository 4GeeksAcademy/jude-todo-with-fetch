import React, { useState, useEffect } from "react";

import Home from "./Home";

const ToddoList = () => {

    const [imputField, setImputfield] = useState("")
    const [tasks, setNewTask] = useState([])
    const API_URL = "https://playground.4geeks.com/todo"

    const createUser = () => {
        fetch(API_URL + "/users/judelin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(Response => console.log(Response))
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
    }

    function bringList() {
        fetch(API_URL + "/users/judelin")
            .then((response) => {
                if (response.status === 404) {
                    createUser()
                }
                return response.json()
            })
            .then((data) => {
                console.log(data.todos)
                setNewTask(data.todos)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        bringList()
    }, [])

    const showTasks = () => {
        fetch(API_URL + "/todos/judelin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "label": imputField,
                "is_done": false,
            })
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                setNewTask(data.todos)
                console.log(tasks)
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }



    const imputChange = (event) => {
        setImputfield(event.target.value)
    }

    const handleTouch = (e) => {
        if (e.key === "Enter" && imputField.trim() !== "") {
            // setNewTask([...tasks, imputField])
            // setImputfield("")
            fetch(API_URL + "/todos/judelin",{
                method: "POST",
               body:JSON.stringify({
                "label": imputField,
                "is_done": false,
               }),
                headers: {
                "Content-Type": "application/json"
               },
            })
            .then(resp=> {
                console.log(resp)
                if(resp.ok){
                    setImputfield("")
                }
                console.log(resp.status)
                return resp.json()
            })
            .then(data => {
                console.log(data);
                setNewTask([...tasks, data])
            })
        
        }
    }

    // function addTask() {
    //     if (imputField.trim() === "") {
    //         return alert("Write before you add it")
    //     }
    //     setNewTask(texte => [...texte, imputField])
    //     setImputfield("")
    // }

    const deletetask = (id) => {
        // const upDateTask = tasks.filter((_, ind) => ind !== index);
        // setNewTask(upDateTask)
        fetch(`${API_URL}/todos/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
       .then((res) => {
        if (!res.ok) throw new Error("Failed to delete todo");
        // Update UI after successful delete
        setNewTask((prevTodos) => prevTodos.filter((task) => task.id !== id));
      })
      .catch((err) => console.error("Error:", err));

    }

    return (
        <div className="container">

            <div className="form">
                <p> todos </p>

                <ol>
                    <li className="form-control input-form justify-content-between">
                        <input className=""
                            type="text" placeholder="What needs to be done?"
                            value={imputField}
                            onChange={imputChange}
                            onKeyDown={handleTouch}

                        />
                        {/* <button className="add-button" onClick={addTask}>Add</button> */}
                    </li>
                    {
                        tasks.map((task) =>
                            <li className="form-control d-flex justify-content-between"
                                key={task.id}><span> {task.label} </span>
                                <button className="delete-button" onClick={() => deletetask(task.id)} >X</button>
                            </li>
                        )
                    }
                    <li className="form-control length"> {tasks.length} item left</li>
                </ol>
            </div>


        </div>
    )
}

export default ToddoList