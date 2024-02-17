import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import styles from  './components/TodoListItem.module.css';
import HomePage from './HomePage';
import TodoContainer from './components/TodoContainer.js'

const TableChooser = () => {
  const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [tableList, setTableList] = useState([]);

  // console.log("tableChooser")



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
      
      // const sordtedData2 = `?sort[0][field]=title&sort[0][direction]=asc&sort[2][field]=completeAd&sort[2][direction]=asc`;
  
      const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;
  
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      // console.log("data ==> ",data)
      const todos = data.tables.map((tableName) => {
        
        const newTodos = {
          name: tableName.name
        }
        
        return newTodos;
      });

      // console.log("todos ==>>",todos)
      
      // setTodoList(todos)
      setTableList(todos)
      

    } catch (error) {
      setIsError(error);
      console.log(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("tableList ==>> ", tableList)
  // console.log("tableName ==>> ", tableName)
  

  React.useEffect(() => {
    fetchData();
  }, [tableName])


  const test = (event) => {
    console.log("event.target.value =>>", event.target.value)
    setTableName(event.target.value)
  }


  return (
    <div>
      <select
        id="selectField"
        value={tableName}
        onChange={(event) => test(event)}
      >
  
      {
        tableList.map((item) => {
          return(
            <option value={item.name}>{item.name}</option>
          )
        })
      }
        {/* <option value={process.env.REACT_APP_TABLE_NAME}>Todo List</option>
        <option value={process.env.REACT_APP_TABLE_NAME2} >Table 2</option> */}
      </select>
      <TodoContainer tableName={tableName} />
    </div>
  );
};


// View part of react
const App = () => {

  console.log("appp")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/TodoList" element={<TableChooser />} />
        <Route
          path="/NewTodoList"
          element={
            <>
              <button>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                  Back
                </Link>
              </button>
              <h1>New Todo List</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
