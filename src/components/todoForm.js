import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "tui-date-picker";
import TagWrap from "./tagWrap";
import { addTag, addTodo, updateTodo } from "../reducer/index";

const TodoForm = (props) => {
  const dispatch = useDispatch();

  const { todo, change, setIsChanging } = props;
  //const { id, title, description, deadline, tags: preTag } = todo;

  const dateInput = useRef();
  const dateWrapper = useRef();
  const tagList = useSelector((state) => state.tagList);
  const [tagInputValue, setTagInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [todoInputValue, setTodoInputValue] = useState("");
  const [dscrpInputValue, setDscrpInputValue] = useState("");

  useEffect(() => {
    let today = new Date();
    var datepicker = new DatePicker(dateWrapper.current, {
      date: today,
      selectableRanges: [
        [
          today,
          new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()),
        ],
      ],
      input: {
        element: dateInput.current,
        format: "yyyy-MM-dd",
      },
    });

    if (change) {
      setTags(todo.tags);
      setTodoInputValue(todo.title);
      setDscrpInputValue(todo.description);
      dateInput.current.value = todo.deadline;
    }
  }, []);

  // 오늘 날짜 구하는 함수
  const getTodayDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let date = String(today.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + date;
  };

  // 추가할 태그가 현재 todo의 태그 리스트에 있는지 확인
  const tagDuplicatedCheck = (newTag) => {
    if (tags.length !== 0) {
      if (!tags.some((tag) => tag.name === newTag.name)) {
        return true;
      } else return false;
    }
    return true;
  };

  // 추가할 태그가 기존에 저장되어 있는 태그리스트에 있는지 확인
  const originalTagDuplicatedCheck = (newTag) => {
    if (tagList) {
      if (tagList.some((tag) => tag.name === newTag.name)) {
        return tagList.filter((v) => v.name === newTag.name);
      }
    }
    return false;
  };

  // 랜덤으로 색 만드는 함수
  const getRandomColor = () => {
    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    color = color.padEnd(7, "0");
    return color;
  };

  const colorDuplicatedCheck = () => {
    let newColor;
    if (tagList) {
      while (true) {
        newColor = getRandomColor();
        if (
          !tagList.some((tag) => tag.bgColor === newColor) &&
          newColor !== "#c6dcec" &&
          newColor !== "#ffffff"
        )
          return newColor;
      }
    }
  };

  // 태그 추가 버튼 클릭시 발생하는 함수
  const handleAddTag = () => {
    let randomBgColor = colorDuplicatedCheck();
    let todayDate = getTodayDate();
    let tag = {
      name: tagInputValue,
      bgColor: randomBgColor,
      fontColor: "#fff",
      createDate: todayDate,
    };

    if (tagInputValue === "") return;
    setTagInputValue("");
    if (tagDuplicatedCheck(tag)) {
      if (originalTagDuplicatedCheck(tag)) {
        setTags((tags) => [...tags, originalTagDuplicatedCheck(tag)[0]]);
      } else {
        setTags((tags) => [...tags, tag]);
        dispatch(addTag(tag));
      }
    }
  };

  // 새로운 할 일 추가하는 함수
  const handleTodoSubmit = () => {
    let todo = {
      id: new Date().getTime(),
      title: todoInputValue,
      description: dscrpInputValue,
      tags: tags,
      createDate: getTodayDate(),
      deadline: dateInput.current.value,
      isCompleted: false,
    };

    if (todoInputValue === "") {
      alert("할 일을 입력해주세요~!!");
      return;
    }
    dispatch(addTodo(todo));
    setTodoInputValue("");
    setDscrpInputValue("");
    setTagInputValue("");
    dateInput.current.value = getTodayDate();
    setTags([]);
  };

  // 할 일 수정하는 함수
  const handleTodoUpdate = () => {
    let newTodo = {
      id: todo.id,
      title: todoInputValue,
      description: dscrpInputValue,
      tags: tags,
      updateDate: getTodayDate(),
      deadline: dateInput.current.value,
      isCompleted: false,
    };
    if (todoInputValue === "") {
      alert("할 일을 입력해주세요~!!");
      return;
    }
    dispatch(updateTodo(newTodo));
    setTodoInputValue("");
    setDscrpInputValue("");
    setTags([]);
    setIsChanging(false);
  };

  return (
    <>
      <Container>
        <TagContainer>
          <TagWrap tagList={tags} setTags={setTags} xBtn="true" />
          <TagInputWrap>
            <TagInput
              type="text"
              placeholder="태그를 입력해 주세요. (최대 10글자)"
              value={tagInputValue}
              onChange={(e) => setTagInputValue(e.target.value)}
              maxLength="10"
            />
            <TagBtn onClick={() => handleAddTag()}>추가</TagBtn>
          </TagInputWrap>
        </TagContainer>

        <DeadlineWrap>
          <SubTitle>마감 목표일: </SubTitle>
          <div className="tui-datepicker-input tui-datetime-input tui-has-focus">
            <input
              type="text"
              id="datepicker-input"
              aria-label="Date-Time"
              ref={dateInput}
            />
            <span className="tui-ico-date"></span>
          </div>
          <div id="wrapper" style={{ marginTop: -1 }} ref={dateWrapper}></div>
        </DeadlineWrap>

        <TodoInput
          type="text"
          placeholder="할 일을 적어주세요. (최대 20글자)"
          maxLength="20"
          value={todoInputValue}
          onChange={(e) => setTodoInputValue(e.target.value)}
        />
        <TextArea
          placeholder="세부사항을 적어주세요. (최대 100글자)"
          maxLength="100"
          value={dscrpInputValue}
          onChange={(e) => setDscrpInputValue(e.target.value)}
        />

        {change ? (
          <>
            <CancelBtn onClick={() => setIsChanging(false)}>취소</CancelBtn>
            <SubmitBtn onClick={() => handleTodoUpdate()}>수정하기</SubmitBtn>
          </>
        ) : (
          <SubmitBtn onClick={() => handleTodoSubmit()}>제출하기</SubmitBtn>
        )}
      </Container>
    </>
  );
};

export default TodoForm;

const Container = styled.div`
  width: 600px;
  background-color: #c6dcec;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  margin-bottom: 20px;
`;

const TagInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TagInput = styled.input`
  padding: 5px;
  height: 40px;
  border-radius: 5px;
  width: 70%;
  font-size: 16px;
`;

const TagBtn = styled.button`
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  background-color: #9dc2d7;

  &:hover {
    cursor: pointer;
  }
`;

const DeadlineWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  margin-right: 10px;
`;

const TodoInput = styled.input`
  display: block;
  padding: 5px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 7px;
  font-size: 16px;
`;

const SubmitBtn = styled.button`
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  background-color: #9dc2d7;
  float: right;

  &:hover {
    cursor: pointer;
  }
`;

const CancelBtn = styled(SubmitBtn)`
  margin-left: 10px;
`;
