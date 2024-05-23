import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleEdit = (id) => {
    let t = todos.find(i => i.id === id);
    setTodo(t.todo); // Update the todo state with the current task's content
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <div className="bg-gray-950 text-white bg-opacity-25 h-[85vh] w-[95vw] sm:w-[35vw] m-auto border-4 border-[#4fc3dc] rounded-lg overflow-hidden">
        <h1 className='text-white text-lg text-center font-bold m-6'>--ADD YOUR TASK--</h1>
        <div className="flex gap-5 mx-auto w-fit my-5">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className='w-[55vw] sm:w-[25vw] rounded-lg text-white bg-black bg-opacity-30 border-2 border-[#4fc3dc] p-1'
          />
          <button
            className='bg-green-500 rounded-lg px-2 cursor-pointer hover:bg-green-600'
            onClick={handleAdd}
            disabled={todo.length <= 2}
          >
            SAVE
          </button>
        </div>
        <div className="flex text-white gap-2 m-auto w-fit">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className='cursor-pointer'
          />
          <label>Show finished</label>
        </div>
        <div className='text-center text-white font-bold my-5'>TASKS ᓚᘏᗢ</div>
        <div className='h-[65%] m-auto overflow-y-auto'>
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className='border-2 border-[#4fc3dc] rounded-lg w-[90%] my-[5px] m-auto flex justify-between p-2'
              >
                <div className="flex">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className='cursor-pointer'
                  />
                  <label className={item.isCompleted ? "line-through" : ""}>{item.todo}</label>
                </div>
                <div className="flex gap-1">
                  <button
                    className='text-sm px-2 bg-green-500 rounded-lg cursor-pointer hover:bg-green-600'
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className='text-sm px-2 bg-red-500 rounded-lg cursor-pointer hover:bg-red-600'
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;