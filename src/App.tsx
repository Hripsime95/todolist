import './App.css'
import { TodoList } from './components/TodoList';
import { TTaskFilter, TTask } from './components/types/type.ts';
import { GenerateId } from './common/generateId.tsx';
import { useState } from 'react';

function App() {

  let [tasks, setState] = useState<TTask[]>([
    {
      id: GenerateId(),
      title: 'CSS',
      type: 'checkbox',
      isDone: true
    },
    {
      id: GenerateId(),
      title: 'JS',
      type: 'checkbox',
      isDone: true
    },
    {
      id: GenerateId(),
      title: 'React',
      type: 'checkbox',
      isDone: false
    },
    {
      id: GenerateId(),
      title: 'React Toolkit',
      type: 'checkbox',
      isDone: false
    },
  ]);

  let [filter, setFilter] = useState<TTaskFilter>('all');
  let tasksForTodoList = tasks;

  if(filter === 'completed') tasksForTodoList = tasks.filter((t) => t.isDone === true);
  if(filter === 'active') tasksForTodoList = tasks.filter((t) => t.isDone === false);

  function filterTasks(filter: TTaskFilter){
    setFilter(filter);
  }


  function removeTask(id: string) {
    debugger;
    let filteredTasks = tasks.filter( t => t.id !== id);
    setState(filteredTasks);
  }

  return (
      <div className="app">
        <TodoList title={'What to learn?'} tasks={tasksForTodoList} removeTask={removeTask} filterTasks={filterTasks}/>
      </div>
  )
}

export default App
