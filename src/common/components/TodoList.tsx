import type { TFilter, TTask } from "../../app/App";
import { AddItem } from "./AddItem";
// import { Button } from "./Button";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton, List, ListItem } from "@mui/material";
import { DeleteOutline, Clear } from "@mui/icons-material";
import Box from '@mui/material/Box';
import { containerSx, getListItemSx } from "../styles/TodolistItem.styles";

type TTLProps = {
  id: string;
  title: string;
  activeFilter: TFilter;
  tasks: TTask[];

  changeFilter: (filter: TFilter, id: string) => void;
  changeTitle: (title: string, id: string) => void;
  deleteTask: (taskId: string, id: string) => void;
  createTask: (name: string, id: string) => void;
  changeTaskStateHandler: (taskId: string, id: string) => void;
  deleteTLHandler: (id: string) => void;
  renameTask: (name: string, taskId: string, id: string) => void;
};

export const TodoList = (props: TTLProps) => {
  const {
    id,
    title,
    activeFilter,
    tasks,
    changeFilter,
    changeTitle,
    deleteTask,
    createTask,
    deleteTLHandler,
    changeTaskStateHandler,
    renameTask
  } = props;

  return (
    <div>
      <EditableSpan value={title} onChange={(newTitle) => changeTitle(newTitle, id)}/>

      <IconButton aria-label="delete" onClick={()=>deleteTLHandler(id)}>
        <DeleteOutline/>
      </IconButton>

      <AddItem
        title="Add Task"
        addItemHandler={(name: string) => createTask(name, id)}
      />
      {tasks.length === 0 ? (
        <p> Тасок нет </p>
      ) : (
        <List>
          {tasks.map((task) => {
            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <Checkbox
                  checked={task.isDone}
                  onChange={() => changeTaskStateHandler(task.id, id)}
                />
                {/* <span>{task.name}</span> */}
                <EditableSpan value={task.name} onChange={(title) => renameTask(title,task.id, id)}></EditableSpan>
                <IconButton 
                  size="small"
                  onClick={() => deleteTask(task.id, id)}
                > <Clear/>

                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={containerSx}>
        <Button
          variant={activeFilter === 'all' ? 'outlined' : 'text'}
          size="small"
          onClick={() => {
            return changeFilter("all", id);
          }}
        >All</Button>
        <Button 
          variant={activeFilter === 'active' ? 'outlined' : 'text'}
          size="small"
          onClick={() => changeFilter("active", id)}
        >Active</Button>
        <Button
          variant={activeFilter === 'completed' ? 'outlined' : 'text'}
          size="small"
          onClick={() => changeFilter("completed", id)}
        >Completed</Button>
      </Box>
    </div>
  );
};
