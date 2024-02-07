import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from  './components/TodoListItem.module.css';
import HomePage from './HomePage';
import { useState } from 'react';
import TodoContainer from './components/TodoContainer.js'
import { Link } from 'react-router-dom';


const TableChooser = () => {
  const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
  return (
    <div>
      <select
        id="selectField"
        value={tableName}
        onChange={(event) => setTableName(event.target.value)}
      >
        <option value={process.env.REACT_APP_TABLE_NAME}>Todo List</option>
    
      </select>
      <TodoContainer tableName={tableName} />
    </div>
  );
};


// View part of react
const App = () => {

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
}



export default App;
