import React from 'react';

// Component setup part
const todoList = [
  {
    id:1,
    title:"Start the react Flamingo class."
  },
  {
    id: 2,
    title: "Complete assignment."
  },
  {
    id: 3,
    title: "Submit your firs lesson assignment."
  },
  {
  id: 4,
  title: "Submit all your lessons of Flamingo class."
  }
];


// View part of react
function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <hr/>
      {/* Show list items here */}
      <ul>
        {todoList.map(function(item) {
          return (
          <li key={item.id}>{item.title}</li>
          )
        }
        )}
      </ul>
    </div>
  );
}

export default App;
