import React from "react";
import TodoListItem from "./TodoListItem";

// list decleared
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
    title: "Submit your second lesson assignment."
  },
  {
  id: 4,
  title: "Submit all your lessons of Flamingo class."
  }
];


// Funtion decleared
let TodoList = () => (
  <div>
    {/* Show list items here */}
    <ul>
        {todoList.map(function(item) {
        return (
          <TodoListItem key={item.id} title={item.title}/>
            );
            }
        )}
  </ul>
  </div>
);


export default TodoList;