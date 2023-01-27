import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useEffect, useState } from "react";

// const inicialTodos = [
//   { id: 1, text: "Aprender React" },
//   { id: 2, text: "Aprender JS" },
//   { id: 3, text: "Aprender Vue.js" },
// ];

const inicialTodos = JSON.parse(localStorage.getItem("dragAndDrog")) || [
  { id: 1, text: "Aprender React" },
   { id: 2, text: "Aprender JS" },
   { id: 3, text: "Aprender Vue.js" },
]

const App = () => {
  const [todos, setTodos] = useState(inicialTodos);

  useEffect(() => {
    localStorage.setItem("dragAndDrog", JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    // console.log(result)
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];
    const [reorderItem] = copyArray.splice(startIndex, 1); //desestructurando un []

    copyArray.splice(endIndex, 0, reorderItem);

    setTodos(copyArray);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo App</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                    {...draggableProvider.draggableProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
