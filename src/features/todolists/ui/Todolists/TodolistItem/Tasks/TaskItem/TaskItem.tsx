import { Checkbox, IconButton, ListItem } from '@mui/material';
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';
import Clear from '@mui/icons-material/Clear';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { getListItemSx } from './TaskItem.styles';
import { deleteTask, updateTask } from '@/features/todolists/model/tasks-slice';
import { DomainTask } from '@/features/api/tasksApi.types';
import { TaskStatus } from '@/common/enums';

type TProps = {
  todoListId: string;
  task: DomainTask;
};

export const TaskItem = (props: TProps) => {
  const { todoListId, task } = props;

  const dispatch = useAppDispatch();

  const isTaskCompleted = task.status === TaskStatus.Completed;

  function renameTask(title: string, taskId: string, id: string) {
    dispatch(updateTask({ todolistId: id, taskId, domainModel: { title } }));
  }

  function changeTaskState(args: {
    taskId: string;
    id: string;
    isDone: boolean;
  }) {
    dispatch(
      updateTask({
        todolistId: args.id,
        taskId: args.taskId,
        domainModel: {
          status: args.isDone ? TaskStatus.Completed : TaskStatus.New,
        },
      }),
    );
  }

  function handleDeleteTask(taskId: string, id: string) {
    dispatch(deleteTask({ todolistId: id, taskId: taskId }));
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
      <IconButton
        size="small"
        onClick={() => handleDeleteTask(task.id, todoListId)}
      >
        {' '}
        <Clear />
      </IconButton>
    </ListItem>
  );
};
