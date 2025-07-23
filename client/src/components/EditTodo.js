import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [name, setName] = useState(todo.name ?? "");
  const [description, setDescription] = useState(todo.description ?? "");
  const [error, setError] = useState(null);

  // edit description function
  const updateData = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      const body = { name, description };
      const response = await fetch(
        `http://localhost:5050/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

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
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#editModal${todo.todo_id}`}
        onClick={() => {
          setName(todo.name ?? "");
          setDescription(todo.description ?? "");
          setError(null);
        }}
      >
        Edit
      </button>

      <div className="modal" id={`editModal${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={(e) => updateData(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
