import { IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import {
  changeTodolistTitleAC,
  deleteTodolistAC,
} from '@/features/todolists/model/todolists-reducer';
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';

type TProps = {
  title: string;
  id: string;
};

export const TodolistTitle = (props: TProps) => {
  const dispatch = useAppDispatch();

  function deleteTodoList(id: string) {
    dispatch(deleteTodolistAC({ id }));
  }

  function changeTitle(title: string, id: string) {
    dispatch(changeTodolistTitleAC({ id, title }));
  }

  const { title, id } = props;
  return (
    <>
      <EditableSpan
        value={title}
        onChange={(newTitle) => changeTitle(newTitle, id)}
      />

      <IconButton aria-label="delete" onClick={() => deleteTodoList(id)}>
        <DeleteOutline />
      </IconButton>
    </>
  );
};
