/** @format */

import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (task.trim() === "") {
      setError("Please enter a task");
      return;
    }

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskText: () => {
          if (taskText.trim() == "") {
            setError("Please enter a task");
            return;
          }
        },
      }),
    })
      .then((res) => res.json())
      .then((savedTask) => {
        setTasks([...tasks, savedTask]);
        setTask("");
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  const toggleTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
      });
  };

  return (
    <div className="container" data-theme={theme}>
      <button
        className="theme-btn"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </button>
      <h1>Make your to-do list</h1>
      <input
        className="input_text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={error}
      />
      <button className="search_button" onClick={addTask}>
        Add your task here:
      </button>
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li
            className={t.isDone ? "task-item done" : "task-item"}
            key={index}
            // style={{ textDecoration: t.isDone ? "line-through" : "none" }}
          >
            <span onClick={() => toggleTask(t._id)}>{t.taskText}</span>
            <button className="dlt_btn" onClick={() => deleteTask(t._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* <p onChange={() => setTasks(tasks.map((n) => ))}></p> */}
      <p className="total-task">you have {tasks.length} tasks in there</p>
    </div>
  );
}

export default App;
