import React from "react";
import TodoListItem from "./TodoListItem";
import styles from './TodoListItem.module.css'

// Funtion decleared
const TodoList = ({todoList, onRemoveTodo}) => (
  <>
    <ul className={styles.ul}>
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