import React, { Fragment } from "react";

const ListTodo = ({ todo }) => {
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-link p-0 font-weight-bold"
        data-toggle="modal"
        data-target={`#viewModal${todo.todo_id}`}
      >
        {todo.name}
      </button>

      <div className="modal" id={`viewModal${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Todo</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body font-weight-bold">{todo.name}</div>
            <div className="modal-body mb-3">{todo.description}</div>
            <div className="modal-footer">
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

export default ListTodo;
