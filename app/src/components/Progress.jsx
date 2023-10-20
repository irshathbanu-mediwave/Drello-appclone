import { formatDate } from "../Utils";

function Progress({ tasks, handleDelete }) {
  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  return (
    <>
      <div className="showCards">
        {tasks
          .filter((t) => t.inState === "progress")
          .map((task, index) => (
            <div
              contentEditable={true}
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
                  className="btn btn"
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                >
                  x
                </button>
              </div>

              <div className="textarea" key={task.id}>
                {task.text}
              </div>

              <div>
                <p>{formatDate(task.dateTime)}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Progress;
