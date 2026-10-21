/** @format */

import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");

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
      <button
        className="search_button"
        onClick={() => {
          if (task.trim() === "") {
            setError("Please enter a task");
            return;
          }

          setTasks([
            ...tasks,
            {
              taskText: task.trim(),
              isDone: false,
            },
          ]);
          setTask("");
          setError("");
        }}
      >
        Add your task here:
      </button>
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li
            className={t.isDone ? "task-item done" : "task-item"}
            key={index}
            // style={{ textDecoration: t.isDone ? "line-through" : "none" }}
          >
            <span
              onClick={() =>
                setTasks(
                  tasks.map((t, i) => {
                    if (i == index) {
                      return { ...t, isDone: !t.isDone };
                    } else {
                      return t;
                    }
                  }),
                )
              }
            >
              {t.taskText}
            </span>
            <button
              className="dlt_btn"
              onClick={() => setTasks(tasks.filter((t, i) => i !== index))}
            >
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
