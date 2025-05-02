import { Fragment, useState } from "react";
import { v1 } from "uuid";
import { TodoList } from "./common/components/TodoList";
import { AddItem } from "./common/components/AddItem";

export type TFilter = "all" | "active" | "completed";
// export type TPriority = 1 | 2 | 3;

export type TTodolist = {
  id: string;
  title: string;
  isDone: boolean;
  filter: TFilter;
  // priority: 1 | 2 | 3 | 4;
};

export type TTask = {
  id: string;
  name: string;
  isDone: boolean;
};

export type TTasks = {
  [key: string]: TTask[];
};

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TTodolist[]>([
    {
      id: todolistId1,
      title: "What to learn",
      isDone: false,
      filter: "all",
      // priority: 4,
    },
    {
      id: todolistId2,
      title: "What to buy",
      isDone: false,
      filter: "all",
      // priority: 4,
    },
  ]);

  const [tasks, setTasks] = useState<TTasks>({
    [todolistId1]: [
      { id: v1(), name: "HTML&CSS", isDone: true },
      { id: v1(), name: "JS", isDone: true },
      { id: v1(), name: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), name: "Rest API", isDone: true },
      { id: v1(), name: "GraphQL", isDone: false },
    ],
  });

  function deleteTodoList(id: string) {
    setTodolists(todolists.filter((tl) => tl.id !== id));
  }

  function createTodoList(title: string) {
    const id = v1();
    const newTodoList: TTodolist = {
      id: id,
      title: title,
      isDone: false,
      filter: "all",
    };
    setTodolists([...todolists, newTodoList]);
    setTasks({ ...tasks, [id]: [] });
  }

  function deleteTask(taskId: string, id: string) {
    let newTasks = tasks[id].filter((t) => t.id !== taskId);
    setTasks({ ...tasks, [id]: newTasks });
  }

  function createTask(name: string, id: string) {
    const newTask = { id: v1(), name, isDone: false };
    tasks[id].push(newTask);
    setTasks({ ...tasks });
  }

  function changeTaskState(taskId: string, id: string) {
    const updatedTasks = tasks[id].map((t) => {
      if (t.id === taskId) t.isDone = !t.isDone;
      return t;
    });
    setTasks({ ...tasks, [id]: updatedTasks });
  }

  function changeFilter(filter: TFilter, id: string) {
    const updatedTL = todolists.map((tl) => {
      return tl.id === id ? { ...tl, filter } : tl;
    });
    setTodolists(updatedTL);
  }

  const todoListComponents = todolists.map((tl) => {
    let filteredTasks = tasks[tl.id];
    if (tl.filter === "active")
      filteredTasks = tasks[tl.id].filter((t) => !t.isDone);
    if (tl.filter === "completed")
      filteredTasks = tasks[tl.id].filter((t) => t.isDone);

    return (
      <TodoList
        key={tl.id}
        id={tl.id}
        title={tl.title}
        activeFilter={tl.filter}
        isDone={tl.isDone}
        tasks={filteredTasks}
        changeFilter={changeFilter}
        deleteTask={deleteTask}
        createTask={createTask}
        changeTaskStateHandler={changeTaskState}
        deleteTLHandler={deleteTodoList}
      />
    );
  });

  return (
    <>
      <AddItem
        title="Add new Todo List"
        addItemHandler={(title: string) => createTodoList(title)}
      />
      {todoListComponents}
    </>
  );
}

export default App;
