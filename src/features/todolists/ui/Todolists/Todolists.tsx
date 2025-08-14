import { Grid, Paper } from '@mui/material';
import { useAppSelector } from '../../../../app/useAppSelector';
import { TodoListItem } from './TodolistItem/TodoListItem';
import { selectTodolists } from '../../model/todolists-selectors';

export type TFilter = 'all' | 'active' | 'completed';

export type TTodolist = {
  id: string;
  title: string;
  filter: TFilter;
};

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper elevation={4} sx={{ p: '0 20px 20px 20px' }}>
              <TodoListItem todolist={tl} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
