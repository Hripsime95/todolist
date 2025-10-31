import { IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';
import { RequestStatus } from '@/common/types/types';
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '@/features/todolists/api/todolistsApi';
import { useAppDispatch } from '@/common/hooks';

type TProps = {
  title: string;
  id: string;
  entityStatus: RequestStatus;
};

export const TodolistTitle = (props: TProps) => {
  const { title, id, entityStatus } = props;

  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();

  const dispatch = useAppDispatch();

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id);
        if (todolist) {
          todolist.entityStatus = entityStatus;
        }
      }),
    );
  };

  function removeTodolistHadnler(id: string) {
    changeTodolistStatus('loading');
    removeTodolist(id)
      .unwrap()
      .catch(() => changeTodolistStatus('idle'));
  }

  return (
    <>
      <EditableSpan
        value={title}
        onChange={(newTitle) => updateTodolistTitle({ title: newTitle, id })}
      />

      <IconButton
        aria-label="delete"
        onClick={() => removeTodolistHadnler(id)}
        disabled={entityStatus == 'loading'}
      >
        <DeleteOutline />
      </IconButton>
    </>
  );
};
