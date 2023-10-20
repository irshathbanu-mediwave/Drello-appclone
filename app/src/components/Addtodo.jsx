import React, { useState } from "react";
import { formatDate } from "../Utils";
function Addtodo({ addTask, tasks, handleDelete, handleTextEdit }) {
  const [text, setText] = useState("");

  const addCard = () => {
    addTask(text);
  };

  function enterKeyPressed(event, newValue, id) {
    if (event.keyCode == 13) {
      console.log("Enter key is pressed");
      setText(newValue);
      handleTextEdit(newValue, id);
      event.target.contentEditable = false;

      return true;
    } else {
      return false;
    }
  }
  function handleTextClick(e) {
    e.target.contentEditable = true;
  }
  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  return (
    <>
      <button className="btn-primary AddButton" onClick={addCard}>
        +
      </button>
      <div className="showCards">
        {tasks
          .filter((t) => t.inState === "todo")
          .map((task, index) => (
            <div
              key={task.id}
              className="card"
              draggable
              onDragStart={(e) => {
                onDragStart(e, task.id);
              }}
            >
              <div className="title-bar">
                Task:
                <button
                  className="btn "
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                >
                  x
                </button>
              </div>

              <div
                className="textarea"
                key={task.id}
                onKeyDown={(e) =>
                  enterKeyPressed(e, e.target.innerHTML, task.id)
                }
                onClick={(e) => handleTextClick(e)}
              >
                {task.text}
              </div>

              <div>
                <p>Task-time{formatDate(task.dateTime)}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Addtodo;
