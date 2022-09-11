import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TodoCreateForm from '../components/todo/forms/todoCreateForm';
import List from "../components/todo/List";

import Modal from "react-modal";
import UserCreateForm from "../components/user/form/userCreateForm";
import ReactLoading from 'react-loading';

export default function HomePage(props) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const name = localStorage.getItem('user');
  
  const changeTheme = (theme) =>{
    props.setTheme(theme);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  var openUserCreateForm = (name) => {
    openModal();
  };

  return (
    <>
      <section className="banner">
        <div className="wrapper">
          <div className="inner">
            <div>
              <Router>
                <Link className="logo" to="/">
                  Todo App
                </Link>
              </Router>
            </div>
            <div className="select-theme">
              <ul>
                <li>
                  <a href="javascript:;" className={props.theme === 'dark' ? "active":""} onClick={()=> { changeTheme('dark') }}>Dark Mod</a>
                </li>
                <li>
                  <a href="javascript:;" className={props.theme === 'light' ? "active":""} onClick={()=> { changeTheme('light') }}>Light Mod</a>
                </li>
              </ul>

              <div className="user-information">
                <a href="javascript:;" onClick={() => {openUserCreateForm()}}>
                  <i className="fa-solid fa-user"></i>
                  { name !== "" && 
                     name
                  }
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="header">
        <div className="wrapper">
          <div className="inner">
            <h1 className="title"> Todos</h1>
          </div>
        </div>
      </section>

      <section className="form">
        <div className="wrapper">
           <TodoCreateForm />
        </div>
      </section>

      <section className="todos">
        <div className="wrapper">
            <List />
        </div>
      </section>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <a onClick={closeModal} style={{float: 'right', cursor: 'pointer'}}>X</a>
        {name != undefined && (
          <UserCreateForm closeModal={closeModal} />
        )}
      </Modal>
    </>
  );
}
