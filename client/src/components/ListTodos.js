import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
import ListTodo from "./ListTodo";

const ListTodos = () => {
  // we will have a list of todos, that will be changing, the default value is an empty array
  const [todos, setTodos] = useState([]);

  // delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5050/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log(deleteTodo);
    } catch (error) {
      console.error(error.message);
    }
  };

  // get all todos function
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5050/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
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
          {todos.map((todo) => (
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
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
