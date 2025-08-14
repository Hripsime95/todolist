import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm';
import { createTodolistAC } from '@/features/todolists/model/todolists-reducer';
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists';
import { Container, Grid } from '@mui/material';
import { useAppDispatch } from './useAppDispatch';

export const Main = () => {
  const dispatch = useAppDispatch();

  function createTodoList(title: string) {
    const action = createTodolistAC(title);
    dispatch(action);
  }

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm
          title="Add new Todo List"
          addItemHandler={(title: string) => createTodoList(title)}
        />
      </Grid>
      <Grid container spacing={5}>
        <Todolists />
      </Grid>
    </Container>
  );
};
