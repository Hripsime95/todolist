import { useAppDispatch } from '@/app/useAppDispatch';
import { useAppSelector } from '@/app/useAppSelector';
import { FilterButtons } from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons';
import { Tasks } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks';
import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle';
import {
  TFilter,
  TTodolist,
} from '@/features/todolists/ui/Todolists/Todolists';
import Box from '@mui/material/Box';
import { CreateItemForm } from '../../../../../common/components/CreateItemForm/CreateItemForm';
import { containerSx } from '../../../../../common/styles/container.styles';
import { selectTasks } from '@/features/todolists/model/tasks-selectors';
import { createTaskAC } from '@/features/todolists/model/tasks-reducer';

export type TTask = {
  id: string;
  name: string;
  isDone: boolean;
};

export type TTasks = {
  [key: string]: TTask[];
};

export const TodoListItem = (props: { todolist: TTodolist }) => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  const { id, title, filter } = props.todolist;

  function createTask(name: string, id: string) {
    dispatch(createTaskAC({ todolistId: id, name }));
  }

  let filteredTasks = getFilteredTasks(filter);

  function getFilteredTasks(filter: TFilter) {
    let fTasks = tasks[id];
    if (filter === 'active') fTasks = tasks[id].filter((t: TTask) => !t.isDone);
    if (filter === 'completed')
      fTasks = tasks[id].filter((t: TTask) => t.isDone);

    return fTasks;
  }

  return (
    <div>
      <TodolistTitle title={title} id={id} />
      <CreateItemForm
        title="Add Task"
        addItemHandler={(name: string) => createTask(name, id)}
      />
      <Tasks id={id} tasks={filteredTasks} />
      <Box sx={containerSx}>
        <FilterButtons filter={filter} id={id} />
      </Box>
    </div>
  );
};
