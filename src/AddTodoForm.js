import React from "react";
import InputWithLabel from "./InputWithLabel";

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
    <form onSubmit={handleAddTodo}>
        <InputWithLabel  todoTitle={todoTitle} onChange={handleTitleChange}>
            <strong>Title: </strong>
        </InputWithLabel>
        <button type="submit" >Add</button>
    </form>
);
}


export default AddTodoForm;
