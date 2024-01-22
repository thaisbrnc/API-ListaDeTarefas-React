import { useState } from 'react';
import ToDo from './components/ToDo';
import ToDoForm from './components/ToDoForm';
import Search from './components/Search';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para academia",
      category: "Pessoal",
      isCompleted: false,
    },
  ])

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");


  const addToDo = (text, category) => {
    const newToDos = [...toDos, {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    },
  ];

    setToDos(newToDos);
  };

  const removeToDo = (id) => {
    const newToDos = [... toDos];
    const filteredToDos = newToDos.filter((toDo) => toDo.id !== id ? toDo : null);
    setToDos(filteredToDos);
  };

  const completeToDo = (id) => {
    const newToDos = [...toDos];
    newToDos.map((toDo) => toDo.id === id ? toDo.isCompleted = ! toDo.isCompleted : toDo);
    setToDos(newToDos);
  }

  return <div className='app'>
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className='toDo-list'>
        {toDos
        .filter((toDo) => filter === "All" ? true : filter === "Completed" ? toDo.isCompleted : !toDo.isCompleted)
        .filter((toDo) => toDo.text.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
        .map((toDo) => (
          <ToDo key={toDo.id} toDo={toDo}  removeToDo = {removeToDo} completeToDo={completeToDo} />
        ))}
      </div>
      <ToDoForm addToDo={addToDo} />
    </div>
}

export default App
