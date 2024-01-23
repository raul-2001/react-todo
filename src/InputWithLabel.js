import React from "react";
import styles from './TodoListItem.module.css'

const InputWithLabel = (props) => {

    const inputRef = React.useRef(null);
    React.useEffect(() => {
        inputRef.current.focus();
    })

        return(
    <>
        <label className={styles.label} htmlFor="todoTitle">{props.children} </label>
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


export default InputWithLabel;