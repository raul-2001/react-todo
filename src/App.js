import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


// View part of react
function App() {

  const [newTodo, setNewTodo] = React.useState('');

  return (
    <div>     
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo}/>
      <p>
        Title: <strong>{newTodo}</strong>
      </p>
      <hr/>
      <TodoList/>
    </div>
  );
}

export default App;
