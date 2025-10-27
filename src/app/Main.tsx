import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm';
import { createTodolist } from '@/features/todolists/model/todolists-slice';
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists';
import { Container, Grid } from '@mui/material';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks';
import { selectIsLoggined } from '@/features/auth/model/auth-slice';
import { Navigate } from 'react-router';
import { Path } from '@/common/routing';

export const Main = () => {
  const dispatch = useAppDispatch();

  function handleCreateTodoList(title: string) {
    dispatch(createTodolist({ title }));
  }

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm
          title="Add new Todo List"
          addItemHandler={(title: string) => handleCreateTodoList(title)}
        />
      </Grid>
      <Grid container spacing={5}>
        <Todolists />
      </Grid>
    </Container>
  );
};
