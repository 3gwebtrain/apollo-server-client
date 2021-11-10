import { GET_TODOS } from "./graphql/Query";
import { useQuery } from '@apollo/client';


import './App.css';
import AddTodos from "./components/AddTodos";
import Todo from "./components/Todo";
import { TodoContext } from "./TodoContext";
import { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState(0);
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Lodging..</p>;
  if (error) return <p>error.message</p>;


  return (
    <TodoContext.Provider value={{ selectedId, setSelectedId }}>
      <div className="container todobox">
        <AddTodos></AddTodos>
        <div className="list-group mt-4">
          {data?.getTodos.map(todo => (
            <Todo key={todo.id} id={todo.id} title={todo.title} detail={todo.detail} date={todo.date}></Todo>
          ))}
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
