import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Section1 from "../components/section1";
import Display from "../components/Display";
import TaskModal from "../components/TaskModal";

import { client } from "../lib/supabase";

import "../css/dashboard.css";

const Home = () => {
  const navigate = useNavigate();

  // =========================================
  // STATES
  // =========================================

  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Selected todo for editing
  const [editingTodo, setEditingTodo] = useState(null);

  // =========================================
  // LOAD TODOS
  // =========================================

  const loadTodos = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await client.auth.getUser();

      if (userError) {
        console.error("User Error:", userError);
        navigate("/login");
        return;
      }

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await client
        .from("todo_user_data")
        .select("*")
        .eq("auth_id", user.id)
        .order("id", {
          ascending: false,
        });

      if (error) {
        console.error("Todo Load Error:", error);
        alert(error.message);
        return;
      }

      setTodos(data || []);
    } catch (error) {
      console.error("Unexpected Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // RUN WHEN HOME LOADS
  // =========================================

  useEffect(() => {
    loadTodos();
  }, []);

  // =========================================
  // OPEN NEW TASK MODAL
  // =========================================

  const handleNewTask = () => {
    // Edit mode remove
    setEditingTodo(null);

    // Open modal
    setShowModal(true);
  };

  // =========================================
  // CLOSE TASK MODAL
  // =========================================

  const handleCloseModal = () => {
    setShowModal(false);

    // Clear editing todo
    setEditingTodo(null);
  };

  // =========================================
  // CREATE TODO
  // =========================================

  const handleCreateTodo = async (todo) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        navigate("/login");
        return false;
      }

      const { data, error } = await client
        .from("todo_user_data")
        .insert({
          auth_id: user.id,
          todo_Name: todo.todo_Name,
          todo_Explanation: todo.todo_Explanation,
          priority: todo.priority,
        })
        .select()
        .single();

      if (error) {
        console.error("Create Todo Error:", error);
        alert(error.message);
        return false;
      }

      // Add new todo at top
      setTodos((prevTodos) => [
        data,
        ...prevTodos,
      ]);

      setShowModal(false);

      return true;

    } catch (error) {
      console.error("Unexpected Create Error:", error);
      alert("Something went wrong.");

      return false;
    }
  };

  // =========================================
  // EDIT TODO
  // =========================================

  const handleEdit = (todo) => {
    // Save selected todo
    setEditingTodo(todo);

    // Open modal
    setShowModal(true);
  };

  // =========================================
  // UPDATE TODO
  // =========================================

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      console.log("Editing Todo:", editingTodo);

      const {
        data: { user },
        error: userError,
      } = await client.auth.getUser();

      console.log("Logged In User:", user);

      if (userError || !user) {
        alert("User not logged in.");
        navigate("/login");
        return false;
      }

      // Check whether task exists
      const { data: existingTodo, error: checkError } = await client
        .from("todo_user_data")
        .select("*")
        .eq("id", editingTodo.id)
        .eq("auth_id", user.id);

      console.log("Existing Todo:", existingTodo);
      console.log("Check Error:", checkError);

      if (checkError) {
        console.error(checkError);
        alert(checkError.message);
        return false;
      }

      if (!existingTodo || existingTodo.length === 0) {
        alert("Task not found for this user.");
        return false;
      }

      // UPDATE
      const { data, error } = await client
        .from("todo_user_data")
        .update({
          todo_Name: updatedTodo.todo_Name,
          todo_Explanation: updatedTodo.todo_Explanation,
          priority: updatedTodo.priority,
        })
        .eq("id", editingTodo.id)
        .eq("auth_id", user.id)
        .select();

      console.log("Updated Data:", data);
      console.log("Update Error:", error);

      if (error) {
        alert(error.message);
        console.error("Update Error:", error);
        return false;
      }

      if (!data || data.length === 0) {
        alert(
          "Update failed. Check your Supabase RLS UPDATE policy."
        );
        return false;
      }

      // Update UI
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingTodo.id
            ? data[0]
            : todo
        )
      );

      setShowModal(false);
      setEditingTodo(null);

      return true;

    } catch (error) {
      console.error("Unexpected Update Error:", error);
      alert("Something went wrong.");
      return false;
    }
  };
  // =========================================
  // DELETE TODO
  // =========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmed) {
      return;
    }

    try {
      // Get logged-in user
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { error } = await client
        .from("todo_user_data")
        .delete()
        .eq("id", id)
        .eq("auth_id", user.id);

      if (error) {
        console.error("Delete Todo Error:", error);
        alert(error.message);
        return;
      }

      // Remove deleted todo from UI
      setTodos((prevTodos) =>
        prevTodos.filter(
          (todo) => todo.id !== id
        )
      );

    } catch (error) {
      console.error("Unexpected Delete Error:", error);
      alert("Something went wrong.");
    }
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const { error } = await client.auth.signOut({
        scope: "local",
      });

      if (error) {
        console.error("Logout Error:", error);
        alert(error.message);
        return;
      }

      navigate("/login");

    } catch (error) {
      console.error("Unexpected Logout Error:", error);
      alert("Something went wrong.");
    }
  };

  // =========================================
  // LOADING SCREEN
  // =========================================

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "#051424",
          color: "#22c55e",
        }}
      >
        <div className="text-center">

          <div
            className="spinner-border text-success mb-3"
            role="status"
          ></div>

          <p className="mb-0">
            Loading Neon Task...
          </p>

        </div>
      </div>
    );
  }

  // =========================================
  // DASHBOARD
  // =========================================

  return (
    <div className="container-fluid p-0">

      <div className="row g-0">

        {/* SIDEBAR */}
        <Sidebar
          onNewTask={handleNewTask}
          onLogout={handleLogout}
        />

        {/* RIGHT SIDE */}
        <div className="col-12 col-md-10 d-flex flex-column p-0">

          {/* NAVBAR */}
          <Navbar />

          {/* CONTENT */}
          <main className="dashboard-content p-4 p-md-5">

            {/* NEW TASK */}
            <Section1
              onNewTask={handleNewTask}
            />

            {/* TASK SECTION */}
            <div className="row col-12 g-4">

              <div className="container">

                <h4 className="mb-2 mt-4 d-flex align-items-center gap-2">

                  <span className="material-icons-outlined text-success">
                    person
                  </span>

                  My Tasks

                </h4>

                {/* TODO DISPLAY */}
                <Display
                  todos={todos}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />

              </div>

            </div>

          </main>

        </div>

      </div>

      {/* =================================
          TASK MODAL
      ================================= */}

      <TaskModal
        show={showModal}
        onClose={handleCloseModal}
        onCreate={handleCreateTodo}
        onUpdate={handleUpdateTodo}
        editingTodo={editingTodo}
      />

    </div>
  );
};

export default Home;