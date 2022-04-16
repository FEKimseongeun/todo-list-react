import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { filterTodo } from "../reducer/index";

const BtnWrap = styled.button`
  width: 80px;
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  color: #fff;

  background-color: ${(props) => (props.clear ? "#cdcfed" : "#9a95cb")};

  &:hover {
    cursor: pointer;
  }
`;

const FilterBtn = (props) => {
  const { title, clear, onClick } = props;

  return (
    <>
      <BtnWrap clear={clear} onClick={onClick}>
        {title}
      </BtnWrap>
    </>
  );
};

export default FilterBtn;
