import React from "react";
import styles from './TodoListItem.module.css';
import {ReactComponent as Check} from '../check.svg';
import PropTypes from 'prop-types';



const TodoListItem = ({item, onRemoveTodo, onToggleTodo }) => {
    
    const handleRemoveClick = () => {
        onRemoveTodo(item.id);
    }


    return(
        <li className={styles.ListItem}>
        <span style={{width: '29%'}}>{item.title}</span>
        <span style={{width: '20%'}}>{item.createdTime}</span>
        <span style={{width: '10%'}}>{item.completeAd}</span>   
        <span style={{width: '10%'}}>{item.completed}</span>     
        <button 
            type="button" 
            onClick={handleRemoveClick} 
            className={`${styles.button}`}
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