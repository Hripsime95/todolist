import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm';
import { useAddTodolistMutation } from '@/features/todolists/api/todolistsApi';
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists';
import { Container, Grid } from '@mui/material';

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation();
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm
          title="Add new Todo List"
          addItemHandler={(title: string) => addTodolist(title)}
        />
      </Grid>
      <Grid container spacing={5}>
        <Todolists />
      </Grid>
    </Container>
  );
};
