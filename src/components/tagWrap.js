import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import Tag from "./tag";

const Container = styled.div`
  margin-bottom: 5px;
`;

const TagWrap = (props) => {
  const { tagList, setTags, xBtn } = props;

  return (
    <React.Fragment>
      <Container>
        {tagList &&
          tagList.map((tag) => {
            return (
              <Tag
                tagList={tagList}
                tag={tag}
                key={tag.name}
                setTags={setTags}
                xBtn={xBtn}
              />
            );
          })}
      </Container>
    </React.Fragment>
  );
};

export default TagWrap;
