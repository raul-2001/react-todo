import React from "react";
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';

const InputWithLabel = (props) => {

    const inputRef = React.useRef(null);
    React.useEffect(() => {
        inputRef.current.focus();
    })

        return(
    <>
        <label data-testid="labelid" className={styles.label} htmlFor="todoTitle">{props.children} </label>
        <input 
            
            id="todoTitle" 
            type="text" 
            name="title" 
            value={props.todoTitle} 
            onChange={props.onChange}
            ref={inputRef}
            className={styles.input}
            />
    </>
    );
}

InputWithLabel.prototype = {
    children: PropTypes.element.isRequired,
}


export default InputWithLabel;