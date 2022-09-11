import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import {
  getAllTodos,
  updateTodoStatus,
  deleteTodo,
} from "../../redux/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import TodoUpdateForm from "./forms/todoUpdateForm";
import ReactLoading from 'react-loading';

export default function List() {
  const dispatch = useDispatch();
  const todoContext = useSelector((state) => state.todoContext);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedTodoItem, setSelectedTodoItem] = React.useState({});
  const [deletedItems, setDeletedItems] = React.useState([]);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const onChange = async (e) => {
    await dispatch(updateTodoStatus(e.target.value));
  };

  var openUpdateTodoForm = (id) => {
    var todoItem = todoContext.todos.find((item) => item.id == id);
    setSelectedTodoItem(todoItem);
    openModal();
  };

  const onDelete = async (id) => {
    setDeletedItems([...deletedItems, id]);

    if (window.confirm("Are you sure?")) {
      await dispatch(deleteTodo(id));
      setDeletedItems(deletedItems.filter((item) => item !== id));
    }
  };

  return (
    <>
      <div className="inner">
        <div className="items">
          {todoContext.todos !== undefined &&
            todoContext.todos.map((item) => (
              <div className="item" key={item.id}>
                <div className="inner">
                  <input
                    type="checkbox"
                    name="item"
                    value={item.id}
                    defaultChecked={item.status ? "checked" : ""}
                    checked={item.status ? "checked" : ""}
                    onChange={onChange}
                  ></input>
                  <label className={item.status ? "completed" : ""}>
                    {" "}
                    {item.title}
                  </label>
                </div>

                <div className="settings">
                  <a
                    onClick={() => {
                      openUpdateTodoForm(item.id);
                    }}
                    data-id={item.id}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </a>
                  {deletedItems.filter((deletedItem) => deletedItem == item.id).length == 0 &&
                  <i
                    onClick={() => {
                      onDelete(item.id);
                    }}
                    className="fa-solid fa-trash"
                  ></i>
                  }

                  {deletedItems.filter((deletedItem) => deletedItem == item.id)
                    .length > 0 && (
                    <ReactLoading
                      className="Loading"
                      type={"spin"}
                      color={"black"}
                      height={"16px"}
                      width={"16px"}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {selectedTodoItem != undefined && (
          <TodoUpdateForm todoItem={selectedTodoItem} />
        )}
      </Modal>
    </>
  );
}
