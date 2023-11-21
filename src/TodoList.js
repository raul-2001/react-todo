import React from "react";
import TodoListItem from "./TodoListItem";

// Funtion decleared
const TodoList = ({todoList, onRemoveTodo}) => (
  <>
    <ul>
        {todoList.map(function(item) {
        return (
          <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo}/>
            );
            }
        )}
    </ul>
  </>
);


export default TodoList;