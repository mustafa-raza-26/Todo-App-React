import React from "react";

const Navbar = () => {
  return (
    <header className="dashboard-navbar d-flex justify-content-between align-items-center px-4 px-md-5 py-4">
      <div>
        <p className="text-success mb-0 small text-uppercase fw-bold">
          Systems Online
        </p>

        <h2 className="display-6 fw-bold mb-0">
          Daily Pulse
        </h2>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button
          className="btn text-white-50 p-2 d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
        >
          <span className="material-icons-outlined">
            menu
          </span>
        </button>

        <span className="material-icons-outlined p-2 border border-secondary border-opacity-25 rounded-circle d-none d-md-flex">
          notifications
        </span>

        <i className="fa-solid fa-user text-white-50 d-none d-md-flex"></i>
      </div>
    </header>
  );
};

export default Navbar;