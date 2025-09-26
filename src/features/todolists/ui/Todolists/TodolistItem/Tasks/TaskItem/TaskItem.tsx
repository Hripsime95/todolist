import { Checkbox, IconButton, ListItem } from '@mui/material';
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';
import Clear from '@mui/icons-material/Clear';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { getListItemSx } from './TaskItem.styles';
import {
  changeTaskNameAC,
  changeTaskStatusAC,
  deleteTaskAC,
} from '@/features/todolists/model/tasks-slice';
import { DomainTask } from '@/features/api/tasksApi.types';
import { TaskStatus } from '@/common/enums';

type TProps = {
  todoListId: string;
  task: DomainTask;
};

export const TaskItem = (props: TProps) => {
  const { todoListId, task } = props;
  console.log('taskId: ', task.id);

  const dispatch = useAppDispatch();

  const isTaskCompleted = task.status === TaskStatus.Completed;

  function renameTask(title: string, taskId: string, id: string) {
    dispatch(changeTaskNameAC({ todolistId: id, taskId, title }));
  }

  function changeTaskState(args: {
    taskId: string;
    id: string;
    isDone: boolean;
  }) {
    dispatch(
      changeTaskStatusAC({
        todolistId: args.id,
        taskId: args.taskId,
        isDone: args.isDone,
      }),
    );
  }

  function deleteTask(taskId: string, id: string) {
    dispatch(deleteTaskAC({ todolistId: id, taskId: taskId }));
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <Checkbox
        checked={isTaskCompleted}
        onChange={() =>
          changeTaskState({
            taskId: task.id,
            id: todoListId,
            isDone: !isTaskCompleted,
          })
        }
      />
      <EditableSpan
        value={task.title}
        onChange={(newName) => renameTask(newName, task.id, todoListId)}
      ></EditableSpan>
      <IconButton size="small" onClick={() => deleteTask(task.id, todoListId)}>
        {' '}
        <Clear />
      </IconButton>
    </ListItem>
  );
};
