import React from "react";
import InputWithLabel from "./InputWithLabel";
import styles from './TodoListItem.module.css';
import PropTyeps from 'prop-types';


// Funtion decleared
const AddTodoForm = ({onAddTodo}) => { 

    const [todoTitle, setTodoTitle] = React.useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    const handleAddTodo = (event) =>{
        event.preventDefault();
        const records = [{
            fields:{title: todoTitle},
        }];
        onAddTodo(records);
        setTodoTitle("");
    }

    return(
    <form onSubmit={handleAddTodo} className={styles.searchForm}>
        <InputWithLabel todoTitle={todoTitle} onChange={handleTitleChange}>
            <strong>Title: </strong>
        </InputWithLabel>
        <button data-testid="submit_button" className={styles.buttonLarge} type="submit" >Add</button>
    </form>
);
}

AddTodoForm.propTypes = {
    onAddTodo: PropTyeps.func,
} 


export default AddTodoForm;
