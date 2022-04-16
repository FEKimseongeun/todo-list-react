const TAG_KEY = "tag_key";
const TODO_KEY = "todo_key";

if (localStorage.getItem(TAG_KEY) === null) {
  localStorage.setItem(TAG_KEY, JSON.stringify([]));
}
if (localStorage.getItem(TODO_KEY) === null)
  localStorage.setItem(TODO_KEY, JSON.stringify([]));

const initState = {
  tagList: JSON.parse(localStorage.getItem(TAG_KEY)),
  todoList: JSON.parse(localStorage.getItem(TODO_KEY)),
  filterState: "All",

  todo: {
    id: null,
    title: null,
    description: null,
    tags: [],
    createDate: null,
    updateDate: null,
    deadline: null,
    completeDate: null,
    isCompleted: null,
  },
};

const ADD_TAG = "ADD_TAG";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const FILTER_TODO = "FILTER_TODO";
const CLEAR_COMPLETED_TODO = "CLEAR_COMPLETED_TODO";

export const addTag = (tag) => ({
  type: ADD_TAG,
  tag,
});

export const addTodo = (todo) => ({
  type: ADD_TODO,
  todo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  todo,
});

export const completeTodo = (id, completeDate) => ({
  type: COMPLETE_TODO,
  id,
  completeDate,
});

export const filterTodo = (filter) => ({
  type: FILTER_TODO,
  filter,
});

export const clearCompletedTodo = () => ({
  type: CLEAR_COMPLETED_TODO,
});

const reducer = (state = initState, action) => {
  let todos = [...state.todoList];
  switch (action.type) {
    case ADD_TAG:
      let tags = [...state.tagList];
      tags.push(action.tag);
      localStorage.setItem(TAG_KEY, JSON.stringify(tags));
      return {
        ...state,
        tagList: tags,
      };
    case ADD_TODO:
      todos.push(action.todo);
      localStorage.setItem(TODO_KEY, JSON.stringify(todos));
      return {
        ...state,
        todoList: todos,
      };
    case DELETE_TODO:
      todos = todos.filter((todo) => todo.id !== action.id);
      console.log(todos);
      localStorage.setItem(TODO_KEY, JSON.stringify(todos));
      return {
        ...state,
        todoList: todos,
      };
    case UPDATE_TODO:
      let updateTodo = todos.filter((todo) => todo.id === action.todo.id)[0];
      console.log(action.todo);
      let updateTodoIdx = todos.indexOf(updateTodo);
      for (const [key, value] of Object.entries(action.todo)) {
        updateTodo[key] = value;
      }
      todos.splice(updateTodoIdx, 1, updateTodo);
      localStorage.setItem(TODO_KEY, JSON.stringify(todos));
      return {
        ...state,
        todoList: todos,
      };
    case COMPLETE_TODO:
      let completedTodo = todos.filter((todo) => todo.id === action.id)[0];
      let completedTodoIdx = todos.indexOf(completedTodo);
      if (completedTodo["isCompleted"] === false) {
        completedTodo["isCompleted"] = true;
        completedTodo["completeDate"] = action.completeDate;
      } else {
        completedTodo["isCompleted"] = false;
        completedTodo["completeDate"] = "";
      }
      todos.splice(completedTodoIdx, 1, completedTodo);
      localStorage.setItem(TODO_KEY, JSON.stringify(todos));
      return {
        ...state,
        todoList: todos,
      };
    case FILTER_TODO:
      let filter;
      if (action.filter === "All") filter = "All";
      else if (action.filter === "Active") filter = "Active";
      else if (action.filter === "Completed") filter = "Completed";
      else if (action.filter === "Deadline") filter = "Deadline";
      else if (action.filter === "CreateDate") filter = "CreateDate";
      return {
        ...state,
        filterState: filter,
      };

    case CLEAR_COMPLETED_TODO:
      let restTodo = todos.filter((todo) => todo.isCompleted === false);
      localStorage.setItem(TODO_KEY, JSON.stringify(restTodo));
      return {
        ...state,
        todoList: restTodo,
      };

    default:
      return state;
  }
};

export default reducer;
