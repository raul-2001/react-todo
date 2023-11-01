import React from "react";
import TodoListItem from "./TodoListItem";

// Funtion decleared
let TodoList = (props) => (
  <div>
    
    <ul>
        {props.todoList.map(function(item) {
        return (
          <TodoListItem key={item.id} title={item.title}/>
            );
            }
        )}
  </ul>
  </div>
);


export default TodoList;