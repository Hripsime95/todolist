import { useState } from "react";
import { AddItem } from "../common/components/AddItem";
import { TodoList } from "../common/components/TodoList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { containerSx } from "../common/styles/TodolistItem.styles";
import { NavButton } from "../common/components/NavButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline'
import Switch from "@mui/material/Switch";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC } from "../model/todolists-reducer";
import { changeTaskNameAC, changeTaskStatusAC, createTaskAC, deleteTaskAC } from "../model/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

export type TFilter = "all" | "active" | "completed";

export type TTodolist = {
  id: string;
  title: string;
  filter: TFilter;
};

export type TTask = {
  id: string;
  name: string;
  isDone: boolean;
};

export type TTasks = {
  [key: string]: TTask[];
};

type ThemeMode = 'dark' | 'light'

function App() {
  const dispatch = useDispatch();

  const todolists = useSelector<RootState, TTodolist[]>(state => state.todolists)

  const tasks = useSelector<RootState, TTasks>(state => state.tasks);
  console.log('todolists:' , todolists);
  console.log('tasks:', tasks);
  
  

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const changeMode = () =>{
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }

  function deleteTodoList(id: string) {
    dispatch(deleteTodolistAC(id));
  }

  function createTodoList(title: string) {
    const action = createTodolistAC(title);
    dispatch(action)
  }

  function changeFilter(filter: TFilter, id: string) {
    dispatch(changeTodolistFilterAC({id, filter}))
  }

  function changeTitle(title: string, id: string) {
    dispatch(changeTodolistTitleAC({id, title}))
  }

  function deleteTask(taskId: string, id: string) {
   dispatch(deleteTaskAC({todolistId:id, taskId:taskId}))
  }

  function createTask(name: string, id: string) {
    dispatch(createTaskAC({todolistId:id, name}));
  }

  function renameTask(name: string, taskId: string, id: string) {
    dispatch(changeTaskNameAC({todolistId:id, taskId, name}));
  }

  function changeTaskState(taskId: string, id: string) {
    dispatch(changeTaskStatusAC({todolistId:id, taskId}));
  }

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  })

  const todoListComponents = todolists.map((tl) => {
    let filteredTasks = tasks[tl.id];
    if (tl.filter === "active")
      filteredTasks = tasks[tl.id].filter((t) => !t.isDone);
    if (tl.filter === "completed")
      filteredTasks = tasks[tl.id].filter((t) => t.isDone);

    return (
      <Grid key={tl.id}>
        <Paper elevation={4} sx={{ p: '0 20px 20px 20px'}}>
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            activeFilter={tl.filter}
            tasks={filteredTasks}
            changeFilter={changeFilter}
            changeTitle={changeTitle}
            deleteTask={deleteTask}
            createTask={createTask}
            changeTaskStateHandler={changeTaskState}
            renameTask={renameTask}
            deleteTLHandler={deleteTodoList}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <AppBar position="static" sx={{ mb: '30px'}}>
            <Toolbar>
              <Container maxWidth="lg" sx={containerSx}>
                <IconButton color="inherit" aria-label="menu">
                  <MenuIcon/>
                </IconButton>
                <div>
                  <NavButton >Sign in</NavButton>
                  <NavButton >Sign up</NavButton>
                  <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                  <Switch color={'default'} onChange={changeMode} />

                </div>
              </Container>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
            <Grid container sx={{ mb: '30px'}}> 
              <AddItem
              title="Add new Todo List"
              addItemHandler={(title: string) => createTodoList(title)}
            />
            </Grid>
            <Grid container spacing={5}>
              {todoListComponents}  
            </Grid> 
          </Container>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
