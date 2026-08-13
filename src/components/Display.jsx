import React from "react";

const Display = ({ todos, onDelete }) => {
  if (!todos || todos.length === 0) {
    return (
      <div className="text-center text-white-50 py-5">
        No tasks available.
      </div>
    );
  }

  return (
    <div className="row justify-content-evenly align-items-stretch g-4 pt-3">
      {todos.map((todo) => (
        <div
          className="task-card col-12 col-md-5"
          key={todo.id}
        >
          <div className="d-flex justify-content-between align-items-start gap-3">

            {/* TASK CONTENT */}
            <div className="flex-grow-1">

              <h5 className="mb-2">
                {todo.todo_Name}
              </h5>

              <p className="text-white-50 mb-3">
                {todo.todo_Explanation || "No description added."}
              </p>

              <span className="badge badge-neon">
                {todo.priority} Priority
              </span>

            </div>

            {/* DELETE BUTTON */}
            <button
              type="button"
              className="delete-todo-btn"
              onClick={() => onDelete(todo.id)}
              title="Delete Task"
            >
              <i className="fa-solid fa-trash"></i>
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Display;