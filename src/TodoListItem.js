import React from "react";


const TodoListItem = ({item, onRemoveTodo }) => {

    const handleRemoveClick = () => {
        onRemoveTodo(item.id);
    }

    return(
        <li>
        {item.title}
        <button type="button" onClick={handleRemoveClick}>Remove</button>
        </li>
        
    );
}

export default TodoListItem;