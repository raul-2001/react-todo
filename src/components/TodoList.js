import React from "react";
import TodoListItem from "./TodoListItem";
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';

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

TodoList.prototype = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
}

export default TodoList;