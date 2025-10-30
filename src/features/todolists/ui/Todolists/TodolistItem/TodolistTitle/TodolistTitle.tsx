import { IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';
import { RequestStatus } from '@/common/types/types';
import {
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '@/features/todolists/api/todolistsApi';

type TProps = {
  title: string;
  id: string;
  entityStatus: RequestStatus;
};

export const TodolistTitle = (props: TProps) => {
  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();

  const { title, id, entityStatus } = props;
  return (
    <>
      <EditableSpan
        value={title}
        onChange={(newTitle) => updateTodolistTitle({ title: newTitle, id })}
      />

      <IconButton
        aria-label="delete"
        onClick={() => removeTodolist(id)}
        disabled={entityStatus == 'loading'}
      >
        <DeleteOutline />
      </IconButton>
    </>
  );
};
