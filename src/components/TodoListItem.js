import React from "react";
import styles from './TodoListItem.module.css';
import {ReactComponent as Check} from '../check.svg';
import PropTypes from 'prop-types';



const TodoListItem = ({item, onRemoveTodo }) => {

    const handleRemoveClick = () => {
        onRemoveTodo(item.id);
    }

    return(
        <li className={styles.ListItem}>
        <span style={{width: '40%'}}>{item.title}</span>
        <button 
            type="button" 
            onClick={handleRemoveClick} 
            className={`${styles.button} ${styles.buttonSmall}`}
        > 
        <Check height="18px" width="18px"/>
        Remove</button>
        </li>
        
    );
}


TodoListItem.prototype = {
    item: PropTypes.string.isRequired,
}

export default TodoListItem;