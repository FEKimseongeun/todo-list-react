import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import TodoList from "./todoList";
import { useSelector, useDispatch } from "react-redux";

const TodoListWrap = () => {
  const todoList = useSelector((state) => state.todoList);
  const filterState = useSelector((state) => state.filterState);

  const [filteredTodo, setFilteredTodo] = useState([]);

  const getTodayDate = (timestamp) => {
    let year = timestamp.getFullYear();
    let month = String(timestamp.getMonth()).padStart(2, "0");
    let date = String(timestamp.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + date;
  };

  useEffect(() => {
    if (filterState === "All") setFilteredTodo(todoList);
    else if (filterState === "Active") {
      let filtered = todoList.filter((todo) => todo["isCompleted"] === false);
      setFilteredTodo(filtered);
    } else if (filterState === "Completed") {
      let filtered = todoList.filter((todo) => todo["isCompleted"] === true);
      setFilteredTodo(filtered);
    } else if (filterState === "Deadline") {
      let copy;
      copy = todoList.map((todo) => {
        let deadlineSplit = todo.deadline.split("-");
        let deadlineDate = new Date(
          deadlineSplit[0],
          deadlineSplit[1],
          deadlineSplit[2]
        );
        todo.deadline = deadlineDate.getTime();
        return todo;
      });
      let filtered = copy.sort((a, b) => a.deadline - b.deadline);
      setFilteredTodo(filtered);
      todoList.forEach((todo) => {
        let date = new Date(todo.deadline);
        todo.deadline = getTodayDate(date);
      });
    } else if (filterState === "CreateDate") {
      let copy;
      copy = todoList.map((todo) => {
        let createDateSplit = todo.createDate.split("-");
        let createDate = new Date(
          createDateSplit[0],
          createDateSplit[1],
          createDateSplit[2]
        );
        todo.createDate = createDate.getTime();
        return todo;
      });
      let filtered = copy.sort((a, b) => a.createDate - b.createDate);
      setFilteredTodo(filtered);
      todoList.forEach((todo) => {
        let date = new Date(todo.createDate);
        todo.createDate = getTodayDate(date);
      });
    }
  }, [todoList, filterState]);

  return (
    <React.Fragment>
      {filteredTodo &&
        filteredTodo.map((todo) => {
          return <TodoList key={todo.id} todo={todo} />;
        })}
    </React.Fragment>
  );
};

export default TodoListWrap;
