import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
import ListTodo from "./ListTodo";

const ListTodos = () => {
  // we will have a list of todos, that will be changing, the default value is an empty array
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  // delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5050/todos/${id}`, {
        method: "DELETE",
      });

      if (!deleteTodo.ok) {
        throw new Error("Server error");
      }

      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log(deleteTodo);
    } catch (error) {
      console.error(error.message);
      setError("Something went wrong. Please try again later.");
    }
  };

  // get all todos function
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5050/todos");

      if (!response.ok) {
        throw new Error("Server error");
      }
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
      setError("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan="4">
                No todos yet. Create one by clicking Add above!
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>
                  <ListTodo todo={todo} />
                </td>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </Fragment>
  );
};

export default ListTodos;
