import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



// View part of react
const App = () => {


  const [todoList, setTodoList] = React.useState(
    []
  );

  const [isLoading, setIsLoading] = React.useState(true);

  const [isError, setIsError] = React.useState(false);

  // GET 
  const fetchData = async () => {

    setIsLoading(true);
    
    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
      }
    }
    
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`;

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        const newTodos = {
          id: todo.id,
          title: todo.fields.title,
        }

        return newTodos

      });
      
      setTodoList(todos)

    } catch (error) {
      setIsError(error);
      console.log(error.message)
    } finally {
      setIsLoading(false);
    }
    
  };


  React.useEffect(() => {
    fetchData();
  }, [])

  const addTodo = (records) => {
    
    try {
      const response = postTodo(records[0].fields);

      if (response) {
        // setTodoList([...todoList, response]);
        fetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  // Creates new todo into Airtable table: 'POST'
  const postTodo = async (todo) => {

    try {

      if (todo.length === 0 ) {
        return 
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify({fields: todo}),
      }
  
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`;

      const response = await fetch(
        url, options
      );

      if (!response.ok) {
        const message = `Error has accured: ${response.status}`;
        throw new Error(message);
      }

      const responseData = await response.json();

      return responseData;

    } catch (error) {
      setIsError(error);
      console.log(error.message);
      return null;
    }
  }

  // Deletes todo from Airtable table: 'DELETE'
  const deleteTodo = async (todo) => {

    try {

      if (!todo) {
        return 
      };

      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
      }
  
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${todo}`;

      const response = await fetch(
        url, options
      );

      if (!response.ok) {
        const message = `Error has accured: ${response.status}`;
        throw new Error(message);
      }

      const deletedData = await response.json();

      return deletedData;
      

    } catch (error) {
      setIsError(error);
      console.log(error.message);
      return null;
    }
  }
  
  
  const removeTodo = (id) => {
    const updatedList = todoList.filter(
      removedItem => removedItem.id !== id
    );
    
    // id for DELETE method
    const deletedList = todoList.filter(
      remitem => remitem.id === id
    );

    const delId = deletedList[0].id;
    deleteTodo(delId);

    setTodoList(updatedList);
  }

  // useEffect for storing data to local storage
  React.useEffect(() => {
    
    if (isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }

  }, [todoList, isLoading])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
        <>
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo={addTodo} />
          <hr />
          {isError && <p>Something went wrong ...</p>}
          {isLoading ? <div>Loading ...</div> :
            (<TodoList todoList={todoList} onRemoveTodo={removeTodo} />)
          }
        </> 
        } />
        <Route path="/new" element={<>
          <h1>New Todo List</h1>
          </>}
        />
      </Routes>  
    </BrowserRouter>
  );
}



export default App;
