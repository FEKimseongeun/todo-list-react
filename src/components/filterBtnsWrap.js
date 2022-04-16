import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import FilterBtn from "./filterBtn";
import { useSelector, useDispatch } from "react-redux";
import { filterTodo, clearCompletedTodo } from "../reducer/index";

const BtnsWrap = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const FilterBtns = () => {
  const dispatch = useDispatch();

  const handleFilter = (filterName) => {
    dispatch(filterTodo(filterName));
  };

  const handleClear = () => {
    if (window.confirm("완료한 일정을 모두 삭제하실건가요??") === true) {
      dispatch(clearCompletedTodo());
    } else return;
  };

  return (
    <>
      <BtnsWrap>
        <FilterBtn title="All" onClick={() => handleFilter("All")} />
        <FilterBtn title="Active" onClick={() => handleFilter("Active")} />
        <FilterBtn
          title="Completed"
          onClick={() => handleFilter("Completed")}
        />
        <FilterBtn title="Deadline" onClick={() => handleFilter("Deadline")} />
        <FilterBtn
          title="CreateDate"
          onClick={() => handleFilter("CreateDate")}
        />
        <FilterBtn
          title="Clear Completed"
          clear="clear"
          onClick={() => handleClear()}
        />
      </BtnsWrap>
    </>
  );
};

export default FilterBtns;
