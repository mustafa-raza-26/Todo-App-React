import React from "react";

const Sidebar = ({ onNewTask, onLogout }) => {
  return (
    <aside
      className="offcanvas-md offcanvas-start sidebar col-md-2"
      tabIndex="-1"
      id="sidebarOffcanvas"
      aria-labelledby="sidebarOffcanvasLabel"
    >
      <div className="offcanvas-header d-md-none justify-content-between align-items-center w-100 mb-3">
        <h5
          className="offcanvas-title neon-text"
          id="sidebarOffcanvasLabel"
        >
          NEON_TASK
        </h5>

        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column h-100 w-100">
        <div className="mb-4 d-none d-md-block">
          <h2 className="neon-text h4 mb-0">
            NEON_TASK
          </h2>

          <p className="text-muted smallest text-white-50">
            PRODUCTIVITY MODE: ON
          </p>
        </div>

        <nav className="nav tpt flex-column gap-2">
          <a className="nav-link active" href="#">
            <span className="material-icons-outlined">
              today
            </span>
            Today
          </a>

          <button
            className="neon-btn mt-2 w-100 mb-4 py-2 small"
            onClick={onNewTask}
          >
            New Task
          </button>
        </nav>

        <div className="help mt-auto pt-4">
          <button
            className="nav-link p-2 px-4"
            onClick={onLogout}
          >
            <span className="material-icons-outlined">
              logout
            </span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;