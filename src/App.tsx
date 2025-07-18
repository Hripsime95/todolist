import { useReducer, useState } from "react";
import { v1 } from "uuid";
import { AddItem } from "./common/components/AddItem";
import { TodoList } from "./common/components/TodoList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { containerSx } from "./common/styles/TodolistItem.styles";
import { NavButton } from "./common/components/NavButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline'
import Switch from "@mui/material/Switch";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from "./model/todolists-reducer";

export type TFilter = "all" | "active" | "completed";
// export type TPriority = 1 | 2 | 3;

export type TTodolist = {
  id: string;
  title: string;
  // isDone: boolean;
  filter: TFilter;
  // priority: 1 | 2 | 3 | 4;
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
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

  const [tasks, setTasks] = useState<TTasks>({
    [todolistId1]: [
      { id: v1(), name: "HTML&CSS", isDone: true },
      { id: v1(), name: "JS", isDone: true },
      { id: v1(), name: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), name: "Rest API", isDone: true },
      { id: v1(), name: "GraphQL", isDone: false },
    ],
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const changeMode = () =>{
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }

  function deleteTodoList(id: string) {
    dispatchToTodolists(deleteTodolistAC(id));
  }

  function createTodoList(title: string) {
    const action = createTodolistAC(title);
    dispatchToTodolists(action)
    setTasks({ ...tasks, [action.payload.id]: [] });
  }

  function changeFilter(filter: TFilter, id: string) {
    dispatchToTodolists(changeTodolistFilterAC({id, filter}))
  }

  function changeTitle(title: TFilter, id: string) {
    dispatchToTodolists(changeTodolistTitleAC({id, title}))
  }

  function deleteTask(taskId: string, id: string) {
    let newTasks = tasks[id].filter((t) => t.id !== taskId);
    setTasks({ ...tasks, [id]: newTasks });
  }

  function createTask(name: string, id: string) {
    const newTask = { id: v1(), name, isDone: false };
    tasks[id].push(newTask);
    setTasks({ ...tasks });
  }

  function renameTask(name: string, taskId: string, id: string) {
    const updatedTasks = tasks[id].map((t) => {
      if (t.id === taskId) t.name = name;
      return t;
    });
    setTasks({ ...tasks, [id]: updatedTasks });
  }

  function changeTaskState(taskId: string, id: string) {
    const updatedTasks = tasks[id].map((t) => {
      if (t.id === taskId) t.isDone = !t.isDone;
      return t;
    });
    setTasks({ ...tasks, [id]: updatedTasks });
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
