import { Checkbox, IconButton, ListItem } from '@mui/material';
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';
import Clear from '@mui/icons-material/Clear';
import { TTask } from '../../TodoListItem';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { getListItemSx } from './TaskItem.styles';
import {
  changeTaskNameAC,
  changeTaskStatusAC,
  deleteTaskAC,
} from '@/features/todolists/model/tasks-reducer';

type TProps = {
  todoListId: string;
  task: TTask;
};

export const TaskItem = (props: TProps) => {
  const { todoListId, task } = props;

  const dispatch = useAppDispatch();

  function renameTask(name: string, taskId: string, id: string) {
    dispatch(changeTaskNameAC({ todolistId: id, taskId, name }));
  }

  function changeTaskState(taskId: string, id: string) {
    dispatch(changeTaskStatusAC({ todolistId: id, taskId }));
  }

  function deleteTask(taskId: string, id: string) {
    dispatch(deleteTaskAC({ todolistId: id, taskId: taskId }));
  }

  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <Checkbox
        checked={task.isDone}
        onChange={() => changeTaskState(task.id, todoListId)}
      />
      <EditableSpan
        value={task.name}
        onChange={(newName) => renameTask(newName, task.id, todoListId)}
      ></EditableSpan>
      <IconButton size="small" onClick={() => deleteTask(task.id, todoListId)}>
        {' '}
        <Clear />
      </IconButton>
    </ListItem>
  );
};
