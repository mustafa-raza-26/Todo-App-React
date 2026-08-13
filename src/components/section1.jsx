import React from "react";

const Section1 = ({ onNewTask }) => {
  return (
    <div className="mb-5">
      <div className="input-group neon-border rounded-3 overflow-hidden bg-dark">
        <input
          type="text"
          className="form-control border-0 bg-transparent py-3 ps-4"
          placeholder="Initialize a new operation..."
          readOnly
          onClick={onNewTask}
        />

        <span className="input-group-text border-0 bg-transparent text-muted small pe-3 d-none d-md-flex">
          CMD + N
        </span>

        <button
          className="btn btn-success rounded-0 px-4"
          onClick={onNewTask}
        >
          <span className="material-icons-outlined">
            add
          </span>
        </button>
      </div>
    </div>
  );
};

export default Section1;