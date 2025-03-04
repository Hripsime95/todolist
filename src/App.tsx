import './App.css'
import { TodoList } from './components/TodoList';
import { TTodoList, TTask } from './components/types/type.ts';
import { GenerateId } from './common/generateId.tsx';

function App() {

  const tasks: TTask[] = [
    {
      id: GenerateId(),
      title: 'CSS',
      type: 'checkbox',
      isChecked: true
    },
    {
      id: GenerateId(),
      title: 'JS',
      type: 'checkbox',
      isChecked: true
    },
    {
      id: GenerateId(),
      title: 'React',
      type: 'checkbox',
      isChecked: false
    },
    {
      id: GenerateId(),
      title: 'React Toolkit',
      type: 'checkbox',
      isChecked: false
    },
  ]

  const todoListData: TTodoList = {
    title: 'What to learn?',
    tasks: tasks
  }

  return (
      <div className="app">
        <TodoList title={todoListData.title} tasks={todoListData.tasks}/>
      </div>
  )
}

export default App
