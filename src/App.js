import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import styles from  './components/TodoListItem.module.css';
import HomePage from './HomePage';
import TodoContainer from './components/TodoContainer.js'
import styles from './components/TablesList.module.css'
import NewTodoList from './components/NewTodoList.js'



// const TableChooser = () => {
//   const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [isError, setIsError] = React.useState(false);
//   const [tableList, setTableList] = useState([]);

//   // console.log("tableChooser")



//     // GET 
//   const fetchData = async () => {
//     setIsLoading(true);

//     const options = {
//       method: "GET",
//       headers: {
//         'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
//       }
//     }
  
//       //const sordtedData = "?view=Grid%20view";
      
//       // const sordtedData2 = `?sort[0][field]=title&sort[0][direction]=asc&sort[2][field]=completeAd&sort[2][direction]=asc`;
  
//       const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;
  
//     try {
//       const response = await fetch(url, options);

//       if (!response.ok) {
//         const message = `Error: ${response.status}`;
//         throw new Error(message);
//       }

//       const data = await response.json();
//       // console.log("data ==> ",data)
//       const todos = data.tables.map((tableName) => {
        
//         const newTodos = {
//           name: tableName.name
//         }
        
//         return newTodos;
//       });

//       // console.log("todos ==>>",todos)
      
//       // setTodoList(todos)
//       setTableList(todos)
      

//     } catch (error) {
//       setIsError(error);
//       console.log(error.message)
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // console.log("tableList ==>> ", tableList)
//   // console.log("tableName ==>> ", tableName)
  

//   React.useEffect(() => {
//     fetchData();
//   }, [tableName])


//   const test = (event) => {
//     console.log("event.target.value =>>", event.target.value)
//     setTableName(event.target.value)
//   }


//   return (
//     <div>
//       <select
//         id="selectField"
//         value={tableName}
//         onChange={(event) => test(event)}
//       >
  
//       {
//         tableList.map((item) => {
//           return(
//             <option value={item.name}>{item.name}</option>
//           )
//         })
//       }
//         {/* <option value={process.env.REACT_APP_TABLE_NAME}>Todo List</option>
//         <option value={process.env.REACT_APP_TABLE_NAME2} >Table 2</option> */}
//       </select>
//       <TodoContainer tableName={tableName} />
//     </div>
//   );
// };


const ChooseTable = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [tableList, setTableList] = useState([]);

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
  }, [tableList])

  return (
    <div className={styles.container}>
    <h1 className={styles.hederContainer}>Choose your Table</h1>
    <hr />
    {isError && <p>Something went wrong ...</p>}
      <ul >
        {
          tableList.map((item) => {
            return(
              <Link key={item.name} to={`/TablesList/${item.name}`} className={styles.button} value={item.name}>
                {item.name}
              </Link>
            )
          })
        }
      </ul>
    </div>
  );
};


// View part of react
const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul style={{listStyle: "none"}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/TablesList" >Tables</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/TodoList" element={<TableChooser />} /> */}
        <Route
          path="/NewTodoList"
          element={
            <>
              <button>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                  Back
                </Link>
              </button>
              
              {<NewTodoList/>}
            </>
          }
        />
        <Route 
          path="/TablesList"
          element={
           
            <div>
              <button>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                  Back
                </Link>
              </button>
              
              <ChooseTable />
            </div>
          }
          
        />
        <Route path="/TablesList/:tableName" element={<TodoContainer />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
