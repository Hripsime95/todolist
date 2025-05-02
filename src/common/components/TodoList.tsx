import type { TFilter, TTask } from "../../App";
import { AddItem } from "./AddItem";
import { Button } from "./Button";
import { Trash2 } from "lucide-react";

type TTLProps = {
  id: string;
  title: string;
  activeFilter: TFilter;
  isDone: boolean;
  tasks: TTask[];

  changeFilter: (filter: TFilter, id: string) => void;
  deleteTask: (taskId: string, id: string) => void;
  createTask: (name: string, id: string) => void;
  changeTaskStateHandler: (taskId: string, id: string) => void;
  deleteTLHandler: (id: string) => void;
};

export const TodoList = (props: TTLProps) => {
  const {
    id,
    title,
    activeFilter,
    isDone,
    tasks,
    changeFilter,
    deleteTask,
    createTask,
    deleteTLHandler,
    changeTaskStateHandler,
  } = props;

  return (
    <div>
      <span>{title}</span>
      <span onClick={() => deleteTLHandler(id)}>
        <Trash2 size={20} />
      </span>

      <AddItem
        title="Add Task"
        addItemHandler={(name: string) => createTask(name, id)}
      />
      {tasks.length === 0 ? (
        <p> Тасок нет </p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => changeTaskStateHandler(task.id, id)}
                />
                <span>{task.name}</span>
                <Button name="x" clickHandler={() => deleteTask(task.id, id)} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          name="All"
          clickHandler={() => {
            return changeFilter("all", id);
          }}
        />
        <Button name="Active" clickHandler={() => changeFilter("active", id)} />
        <Button
          name="Completed"
          clickHandler={() => changeFilter("completed", id)}
        />
      </div>
    </div>
  );
};
