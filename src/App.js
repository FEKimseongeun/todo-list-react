import React from "react";
import styled, { css } from "styled-components";
import TodoForm from "./components/todoForm";
import FilterBtns from "./components/filterBtnsWrap";
import TodoListWrap from "./components/todoListWrap";
const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding-top: 30px;
`;
function App() {
  return (
    <React.Fragment>
      <Container>
        <TodoForm />
        <FilterBtns />
        <TodoListWrap />
      </Container>
    </React.Fragment>
  );
}

export default App;
