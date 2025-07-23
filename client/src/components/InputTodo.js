import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    try {
      const body = { name, description };
      const response = await fetch("http://localhost:5050/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      window.location = "/";
    } catch (error) {
      console.error(error.message);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </Fragment>
  );
};

export default InputTodo;
