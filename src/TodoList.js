import React from "react";
import TodoListItem from "./TodoListItem";

// Funtion decleared
const TodoList = ({todoList}) => (
  <div>
    
    <ul>
        {todoList.map(function(item) {
        return (
          <TodoListItem key={item.id} title={item.title}/>
            );
            }
        )}
  </ul>
  </div>
);


export default TodoList;