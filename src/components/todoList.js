import React, { useState, useRef, useEffect } from "react";

import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiFillAlert,
  AiFillCloseCircle,
} from "react-icons/ai";
import TodoForm from "./todoForm";
import TagWrap from "./tagWrap";
import { deleteTodo, completeTodo } from "../reducer/index";

const TodoList = (props) => {
  const dispatch = useDispatch();

  const { id, title, description, tags, createDate, deadline, isCompleted } =
    props.todo;

  const [isChanging, setIsChanging] = useState(false);
  const [isUrgent, setIsUrgent] = useState();

  useEffect(() => {
    setIsUrgent(dateCalculator());
  }, [isCompleted]);

  const deleteBtnClick = () => {
    if (window.confirm("해당 일정을 삭제하시겠습니까? ") === true) {
      dispatch(deleteTodo(id));
    } else return;
  };

  const handleChange = () => {
    setIsChanging(true);
  };

  // 오늘 날짜 구하는 함수
  const getTodayDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let date = String(today.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + date;
  };

  // 마감 목표일과 오늘날짜 차이 계산하는 함수
  const dateCalculator = () => {
    let todaySplit = getTodayDate().split("-");
    let today = new Date(todaySplit[0], todaySplit[1], todaySplit[2]);
    let deadlineSplit = deadline.split("-");
    let deadlineDate = new Date(
      deadlineSplit[0],
      deadlineSplit[1],
      deadlineSplit[2]
    );

    let diff =
      (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (!isCompleted) {
      if (diff >= 0 && diff <= 3) return "alert";
      else if (diff < 0) return "fail";
      return;
    }
    return;
  };

  const handleComplete = () => {
    dispatch(completeTodo(id, getTodayDate()));
    setIsUrgent();
  };

  return (
    <React.Fragment>
      {isChanging ? (
        <TodoForm
          todo={props.todo}
          change={isChanging}
          setIsChanging={setIsChanging}
        />
      ) : (
        <Container completed={isCompleted}>
          <TopWrap>
            <DeadlineWrap>
              <AlertIconWrap>
                {isUrgent === "alert" ? (
                  <AiFillAlert size="30" color="red" />
                ) : isUrgent === "fail" ? (
                  <AiFillCloseCircle size="30" color="red" />
                ) : (
                  <></>
                )}
              </AlertIconWrap>
              <h3>마감 목표일: {deadline}</h3>
            </DeadlineWrap>
            <div>
              <TopBtn completed={isCompleted} onClick={() => handleChange()}>
                수정
              </TopBtn>
              <TopBtn onClick={() => deleteBtnClick()}>삭제</TopBtn>
            </div>
          </TopWrap>
          <TagWrap tagList={tags} />
          <TodoWrap>
            <CheckBtn completed={isCompleted} onClick={() => handleComplete()}>
              {isCompleted ? (
                <AiFillCheckCircle size="40" />
              ) : (
                <AiOutlineCheckCircle size="40" />
              )}
            </CheckBtn>
            <TodoTitle completed={isCompleted}>{title}</TodoTitle>
          </TodoWrap>
          <p>{description}</p>
        </Container>
      )}
    </React.Fragment>
  );
};

export default TodoList;

const Container = styled.div`
  width: 600px;
  padding: 20px;
  border-radius: 20px;
  background-color: ${(props) => (props.completed ? "#dee3e8" : "#f4e0e3")};
  margin-bottom: 20px;
`;

const TopWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopBtn = styled.button`
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  background-color: #e5b4c0;
  margin-left: 10px;
  ${(props) =>
    props.completed &&
    css`
      display: none;
    `}

  &:hover {
    cursor: pointer;
  }
`;
const AlertIconWrap = styled.div`
  display: inline-block;
  margin-right: 10px;
`;
const DeadlineWrap = styled.div`
  display: flex;
  align-items: center;
`;

const TodoWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckBtn = styled.div`
  display: inline-block;
  align-items: center;
  margin-right: 10px;
  background-color: ${(props) => (props.completed ? "#dee3e8" : "#f4e0e3")};

  &:hover {
    cursor: pointer;
  }
`;

const TodoTitle = styled.span`
  font-size: 24px;
  font-weight: bold;

  ${(props) =>
    props.completed &&
    css`
      color: gray;
      text-decoration-line: line-through;
    `}
`;
