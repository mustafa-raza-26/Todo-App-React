import React, { useEffect, useState } from "react";

const TaskModal = ({
  show,
  onClose,
  onCreate,
  onUpdate,
  editingTodo,
}) => {
  // =========================================
  // STATES
  // =========================================

  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [priority, setPriority] = useState("HIGH");

  // =========================================
  // LOAD EDIT DATA
  // =========================================

  useEffect(() => {
    if (editingTodo) {
      // Edit mode
      setTodoName(editingTodo.todo_Name || "");
      setTodoDescription(
        editingTodo.todo_Explanation || ""
      );
      setPriority(editingTodo.priority || "HIGH");
    } else {
      // Create mode
      setTodoName("");
      setTodoDescription("");
      setPriority("HIGH");
    }
  }, [editingTodo, show]);

  // =========================================
  // CLOSE MODAL
  // =========================================

  const handleClose = () => {
    setTodoName("");
    setTodoDescription("");
    setPriority("HIGH");

    onClose();
  };

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = async () => {
    // Validation
    if (!todoName.trim()) {
      alert("Please enter task title.");
      return;
    }

    const todoData = {
      todo_Name: todoName,
      todo_Explanation: todoDescription,
      priority: priority,
    };

    let success = false;

    // =========================================
    // EDIT MODE
    // =========================================

    if (editingTodo) {
      success = await onUpdate(todoData);
    }

    // =========================================
    // CREATE MODE
    // =========================================

    else {
      success = await onCreate(todoData);
    }

    // =========================================
    // RESET FORM AFTER SUCCESS
    // =========================================

    if (success) {
      setTodoName("");
      setTodoDescription("");
      setPriority("HIGH");
    }
  };

  // Don't show modal
  if (!show) return null;

  return (
    <div className="neon-modal-overlay">
      <div className="neon-modal">

        {/* =================================
            HEADER
        ================================= */}

        <div className="neon-modal-header">

          <h5>
            <i
              className={
                editingTodo
                  ? "bi bi-pencil-square"
                  : "bi bi-plus-lg"
              }
            ></i>

            {editingTodo
              ? " Edit Task"
              : " Initialize Task"}
          </h5>

          <button
            type="button"
            className="neon-modal-close"
            onClick={handleClose}
          >
            ×
          </button>

        </div>

        {/* =================================
            BODY
        ================================= */}

        <div className="neon-modal-body">

          {/* TASK TITLE */}

          <label className="heading">
            TASK TITLE
          </label>

          <div className="neon-field">

            <i className="fa-solid fa-pen-to-square neon-field-icon"></i>

            <input
              type="text"
              placeholder="What needs to be done?"
              value={todoName}
              onChange={(e) =>
                setTodoName(e.target.value)
              }
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

        {/* =================================
            FOOTER
        ================================= */}

        <div className="neon-modal-footer">

          <button
            className="create-btn"
            onClick={handleSubmit}
          >
            <i
              className={
                editingTodo
                  ? "bi bi-check-lg me-2"
                  : "bi bi-plus-lg me-2"
              }
            ></i>

            {editingTodo
              ? "Update Task"
              : "Initialize Task"}

          </button>

        </div>

      </div>
    </div>
  );
};

export default TaskModal;