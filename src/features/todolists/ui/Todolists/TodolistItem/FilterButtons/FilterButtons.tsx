import { Button } from '@mui/material';
import { TFilter } from '../../Todolists';
import { changeTodolistFilterAC } from '@/features/todolists/model/todolists-reducer';
import { useAppDispatch } from '@/app/useAppDispatch';

type TProps = {
  id: string;
  filter: string;
};

export const FilterButtons = (props: TProps) => {
  const { id, filter } = props;

  const dispatch = useAppDispatch();

  function changeFilter(filter: TFilter, id: string) {
    dispatch(changeTodolistFilterAC({ id, filter }));
  }

  return (
    <>
      <Button
        variant={filter === 'all' ? 'outlined' : 'text'}
        size="small"
        onClick={() => {
          return changeFilter('all', id);
        }}
      >
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'text'}
        size="small"
        onClick={() => changeFilter('active', id)}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'outlined' : 'text'}
        size="small"
        onClick={() => changeFilter('completed', id)}
      >
        Completed
      </Button>
    </>
  );
};
