import { DomainTask } from '@/features/todolists/api/tasksApi.types';
import { DomainTodolist } from '@/features/todolists/model/todolists-slice';
import { FilterButtons } from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons';
import { Tasks } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks';
import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle';
import Box from '@mui/material/Box';
import { CreateItemForm } from '../../../../../common/components/CreateItemForm/CreateItemForm';
import { containerSx } from '../../../../../common/styles/container.styles';
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi';

export type TTask = {
  id: string;
  name: string;
  isDone: boolean;
};

export type TTasks = {
  [key: string]: DomainTask[];
};

export const TodoListItem = (props: { todolist: DomainTodolist }) => {
  const [createTask] = useCreateTaskMutation();
  const { id, title, filter, entityStatus } = props.todolist;

  return (
    <div>
      <TodolistTitle title={title} id={id} entityStatus={entityStatus} />
      <CreateItemForm
        title="Add Task"
        addItemHandler={(title: string) =>
          createTask({ todolistId: id, title })
        }
        disabled={entityStatus === 'loading'}
      />
      <Tasks id={id} filter={filter} />
      <Box sx={containerSx}>
        <FilterButtons filter={filter} id={id} />
      </Box>
    </div>
  );
};
