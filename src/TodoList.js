import React from "react";
import TodoListItem from "./TodoListItem";

// Funtion decleared
const TodoList = ({todoList}) => (
  <>
    <ul>
        {todoList.map(function(item) {
        return (
          <TodoListItem key={item.id} item={item}/>
            );
            }
        )}
    </ul>
  </>
);


export default TodoList;