import TodoList from "./TodoList";
import React from "react";

const obj = {a: 1, b: 2};
const {a, b} = obj;

// convert array to str
const strData = JSON.parse(localStorage.getItem(todoList) || []);

// hook
const [todoList, setTodoList] = React.useState(strData);

// storing data in local storage and convrting array to string
React.useEffect( () => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
}, [todoList])