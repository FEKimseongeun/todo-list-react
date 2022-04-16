import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { BsX } from "react-icons/bs";

const Container = styled.div`
  padding: 7px;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
  justify-content: space-between;
  margin: 0 5px 5px 0;
  display: inline-block;
`;

const TagName = styled.span`
  color: ${(props) => props.fontColor};
  white-space: nowrap;
`;

const BtnWrap = styled.div`
  display: inline-block;
  vertical-align: middle;

  &:hover {
    cursor: pointer;
  }
`;

const Tag = (props) => {
  const { tag, tagList, setTags, xBtn } = props;

  const handleDeleteTag = (name) => {
    setTags(tagList.filter((tag) => tag.name !== name));
  };

  return (
    <React.Fragment>
      <Container bgColor={tag.bgColor}>
        <TagName fontColor={tag.fontColor}>{tag.name}</TagName>
        <BtnWrap>
          {xBtn && <BsX size="20" onClick={() => handleDeleteTag(tag.name)} />}
        </BtnWrap>
      </Container>
    </React.Fragment>
  );
};

export default Tag;
