import React, { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import styles from './TodoListItem.module.css';


const TodoContainer = ({ tableName1 }) => {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState('asc');


  
  const {tableName} = useParams();

  // console.log("tableName in todoContainer =>>", {tableName})

  // GET 
  const fetchData = async () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
      }
    }

    //const sordtedData = "?view=Grid%20view";
    
    const sordtedData2 = `?sort[0][field]=title&sort[0][direction]=asc&sort[2][field]=completeAd&sort[2][direction]=asc`;

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${sordtedData2}`;

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
          completeAd: todo.fields.completeAd,
          createdTime: todo.fields.createdTime,
          completed: todo.fields.completed || false,
        }
        
        return newTodos;
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
  }, [tableName])

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

      if (todo.length === 0) {
        return
      };

      console.log("post data =>>", todo)

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify({ fields: todo }),
      }

      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/`;

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

      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${todo}`;

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


  const toggleTodo = useCallback((col) => {

    if (sortOrder === 'asc') {
      const sorted = [...todoList].sort((a, b) => {

        if (typeof a[col] === 'string' || a[col] instanceof String) {
          // console.log("typeof a[col] === string");
          return(

              a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1

          )
        } else {
          return new Date(a[col]) -  new Date(b[col])
        }
        }

      );
      setTodoList(sorted);
      setSortOrder("dsc");
    }
    


    if (sortOrder === 'dsc') {
      const sorted = [...todoList].sort((a, b) => {

        if (typeof a[col] === 'string' || a[col] instanceof String) {

          return(

              a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1

          )
        } else {
          return new Date(b[col]) -  new Date(a[col])
        }

      }
        
      );
      setTodoList(sorted);
      setSortOrder("asc")
    }
    
  }, [todoList, sortOrder]);


  return (
    <section>
      <button>
        <Link to="/TablesList" style={{ color: "black", textDecoration: "none" }}>
          Back
        </Link>
      </button>
      <h1 className={styles.headlinePrimary}>Todo List</h1>
      <div className={styles.container}>
        <AddTodoForm onAddTodo={addTodo} />
        <hr />
        {isError && <p>Something went wrong ...</p>}
        {isLoading ? <div>Loading ...</div> :
          (<TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo} 
          onToggleTodo={toggleTodo}

          />)
        }
      </div>
    </section>
  );
}

export default TodoContainer;