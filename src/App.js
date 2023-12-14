import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';



// View part of react
const App = () => {

  const [todoList, setTodoList] = React.useState(
    []
  );

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve({data: {todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [] }});
      }, 2000);
    });

    fetchData
      .then((result) => {
        setTodoList(result.data.todoList)
      });

    setIsLoading(false);

  }, [])


  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }

  const removeTodo = (id) => {
    const updatedList = todoList.filter( 
      removedItem =>   removedItem.id !== id 
    );
    setTodoList(updatedList);
  }

  // useEffect for storing data to local storage
  React.useEffect(() => {
    if (isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
    
  }, [todoList, isLoading])

  return (
    <>     
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <hr/>
      {isLoading? ("Loading"):
        (<TodoList todoList={todoList} onRemoveTodo={removeTodo}/>)
      }
    </>
  );
}



export default App;
