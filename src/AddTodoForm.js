import React from "react";

// Funtion decleared
let AddTodoForm = (props) => { 

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
        props.onAddTodo(newTodo);
    }

    return(
    <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title</label>
        <input id="todoTitle" type="text" name="title" value={props.todoTitle} onChange={handleTitleChange}></input>
        <button type="button" >Add</button>
    </form>
);
}


export default AddTodoForm;