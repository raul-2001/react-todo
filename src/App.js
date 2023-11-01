import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


// View part of react
function App() {

  //const [newTodo, setNewTodo] = React.useState('');

  const [todoList, setTodoList] = React.useState([]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
    
  }

  return (
    <div>     
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      {/* <p>
        Title: <strong>{newTodo}</strong>
      </p> */}
      <hr/>
      <TodoList todoList={todoList}/>
    </div>
  );
}



export default App;
