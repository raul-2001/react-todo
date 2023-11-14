import React from "react";

// Funtion decleared
const AddTodoForm = ({onAddTodo}) => { 

    const [todoTitle, setTodoTitle] = React.useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    const handleAddTodo = (event) =>{
        event.preventDefault();
        const newTodo = {
            title: todoTitle,
            id: Date.now(),
        };
        onAddTodo(newTodo);
        setTodoTitle("");
    }

    return(
    <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title </label>
        <input id="todoTitle" type="text" name="title" value={todoTitle} onChange={handleTitleChange}></input>
        <button type="submit" >Add</button>
    </form>
);
}


export default AddTodoForm;
