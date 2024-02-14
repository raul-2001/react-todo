import React from "react";
import TodoListItem from "./TodoListItem";
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';


// Funtion decleared
const TodoList = ({ todoList, onRemoveTodo, onToggleTodo }) => {
  
  const handleToggle = (data) => {
    onToggleTodo(data)
  }
  
  return(
  <div>
    <ul className={styles.ul}>
        <li className={styles.ListItem}>
          <span style={{width: '29%'}}>
            <button type="button"
              onClick={() => handleToggle("title")}
              className={`${styles.buttonSmall}`}
            >
              Title
            </button>
          </span>

          <span style={{width: '20%'}}>
            <button type="button"
              onClick={() => handleToggle("createdTime")}
              className={`${styles.buttonSmall}`}
            >
              Create time
            </button>
          </span>
          <span style={{width: '20%'}}>
            <button type="button"
              onClick={() => handleToggle("completeAd")}
              className={`${styles.buttonSmall}`}
            >
              Complete time
            </button>
          </span>

        </li>
        {todoList.map(function(item) {
        return (
          <TodoListItem 
          key={item.id} 
          item={item} 
          onRemoveTodo={onRemoveTodo}
          onToggleTodo={onToggleTodo}

          />
            );
            }
        )}
    </ul>
  </div>
)}

TodoList.prototype = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
}

export default TodoList;