import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
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
import { createTask } from '@/features/todolists/model/tasks-slice';
import { DomainTask } from '@/features/api/tasksApi.types';
import { DomainTodolist } from '@/features/todolists/model/todolists-slice';

export type TTask = {
  id: string;
  name: string;
  isDone: boolean;
};

export type TTasks = {
  [key: string]: DomainTask[];
};

export const TodoListItem = (props: { todolist: DomainTodolist }) => {
  const dispatch = useAppDispatch();

  const { id, title, filter, entityStatus } = props.todolist;

  function handleCreateTask(title: string, id: string) {
    dispatch(createTask({ todolistId: id, title }));
  }

  return (
    <div>
      <TodolistTitle title={title} id={id} entityStatus={entityStatus} />
      <CreateItemForm
        title="Add Task"
        addItemHandler={(title: string) => handleCreateTask(title, id)}
        disabled={entityStatus === 'loading'}
      />
      <Tasks id={id} filter={filter} />
      <Box sx={containerSx}>
        <FilterButtons filter={filter} id={id} />
      </Box>
    </div>
  );
};
