import React, { useState } from "react";

const TaskModal = ({ show, onClose, onCreate }) => {
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [priority, setPriority] = useState("HIGH");

  if (!show) return null;

const handleCreate = async () => {
  if (!todoName.trim()) {
    alert("Please enter task title.");
    return;
  }

  const success = await onCreate({
    todo_Name: todoName,
    todo_Explanation: todoDescription,
    priority: priority,
  });

  // Sirf successful save ke baad modal close hoga
  if (success) {
    setTodoName("");
    setTodoDescription("");
    setPriority("HIGH");
  }
};

  return (
    <div className="neon-modal-overlay">
      <div className="neon-modal">

        {/* HEADER */}
        <div className="neon-modal-header">
          <h5>
            <i className="bi bi-plus-lg"></i>
            Initialize Task
          </h5>

          <button
            type="button"
            className="neon-modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="neon-modal-body">

          {/* TITLE */}
          <label className="heading">
            TASK TITLE
          </label>

          <div className="neon-field">
            <i className="fa-solid fa-pen-to-square neon-field-icon"></i>

            <input
              type="text"
              placeholder="What needs to be done?"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <label className="heading">
            DESCRIPTION
          </label>

          <div className="neon-field neon-textarea-field">
            <i className="fa-solid fa-bars neon-field-icon"></i>

            <textarea
              rows="5"
              placeholder="Add context, links, or notes..."
              value={todoDescription}
              onChange={(e) =>
                setTodoDescription(e.target.value)
              }
            ></textarea>
          </div>

          {/* PRIORITY */}
          <div className="priority-wrapper">

            <label className="heading">
              PRIORITY LEVEL
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option value="HIGH">HIGH</option>
              <option value="MID">MID</option>
              <option value="LOW">LOW</option>
            </select>

          </div>

        </div>

        {/* FOOTER */}
        <div className="neon-modal-footer">
          <button
            className="create-btn"
            onClick={handleCreate}
          >
            Initialize Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default TaskModal;