import { IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import {
  changeTodolistTitle,
  deleteTodolist,
} from '@/features/todolists/model/todolists-slice';
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';
import { RequestStatus } from '@/common/types/types';

type TProps = {
  title: string;
  id: string;
  entityStatus: RequestStatus;
};

export const TodolistTitle = (props: TProps) => {
  const dispatch = useAppDispatch();

  function handleDeleteTodoList(id: string) {
    console.log(props);
    dispatch(deleteTodolist({ id }));
  }

  function changeTitle(title: string, id: string) {
    dispatch(changeTodolistTitle({ id, title }));
  }

  const { title, id, entityStatus } = props;
  return (
    <>
      <EditableSpan
        value={title}
        onChange={(newTitle) => changeTitle(newTitle, id)}
      />

      <IconButton
        aria-label="delete"
        onClick={() => handleDeleteTodoList(id)}
        disabled={entityStatus == 'loading'}
      >
        <DeleteOutline />
      </IconButton>
    </>
  );
};
