import { Grid, Paper } from '@mui/material';
import { TodoListItem } from './TodolistItem/TodoListItem';
import { useGetTodolistsQuery } from '../../api/todolistsApi';

export type TFilter = 'all' | 'active' | 'completed';

export type TTodolist = {
  id: string;
  title: string;
  filter: TFilter;
};

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery();

  return (
    <>
      {todolists?.map((tl) => {
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
