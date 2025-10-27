import { Grid, Paper } from '@mui/material';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { TodoListItem } from './TodolistItem/TodoListItem';
import { useEffect } from 'react';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { fetchTodolists, selectTodolists } from '../../model/todolists-slice';

export type TFilter = 'all' | 'active' | 'completed';

export type TTodolist = {
  id: string;
  title: string;
  filter: TFilter;
};

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolists());
  }, []);

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
