import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

// Custom Hooks
const useSemiPersistentState = (key, initialState) => {

  // We read the saved data from local storage
    const savedTodoList = JSON.parse(localStorage.getItem(key))

    const [value, setValue] = React.useState(savedTodoList || initialState);

      // using useEffect storing the data to local storage
    React.useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value, setValue]
}

// View part of react
function App() {


  const [todoList, setTodoList] = useSemiPersistentState('savedTodoList', []);




  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <>     
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      {/* <p>
        Title: <strong>{newTodo}</strong>
      </p> */}
      <hr/>
      <TodoList todoList={todoList}/>
    </>
  );
}



export default App;
