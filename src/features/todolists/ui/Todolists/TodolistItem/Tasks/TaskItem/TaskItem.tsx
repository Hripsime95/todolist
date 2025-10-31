import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';
import { TaskStatus } from '@/common/enums';
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '@/features/todolists/api/tasksApi';
import { DomainTask } from '@/features/todolists/api/tasksApi.types';
import Clear from '@mui/icons-material/Clear';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import { getListItemSx } from './TaskItem.styles';

type TProps = {
  todolistId: string;
  task: DomainTask;
};

export const TaskItem = (props: TProps) => {
  const { todolistId, task } = props;
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const isTaskCompleted = task.status === TaskStatus.Completed;

  function renameTaskHandler(title: string, taskId: string, id: string) {
    updateTask({ todolistId: id, taskId, model: { title } });
  }

  function changeTaskStateHandler(args: {
    taskId: string;
    id: string;
    isDone: boolean;
  }) {
    updateTask({
      todolistId: args.id,
      taskId: args.taskId,
      model: {
        ...task,
        status: args.isDone ? TaskStatus.Completed : TaskStatus.New,
      },
    });
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <Checkbox
        checked={isTaskCompleted}
        onChange={() =>
          changeTaskStateHandler({
            taskId: task.id,
            id: todolistId,
            isDone: !isTaskCompleted,
          })
        }
      />
      <EditableSpan
        value={task.title}
        onChange={(newName) => renameTaskHandler(newName, task.id, todolistId)}
      ></EditableSpan>
      <IconButton
        size="small"
        onClick={() => deleteTask({ todolistId, taskId: task.id })}
      >
        {' '}
        <Clear />
      </IconButton>
    </ListItem>
  );
};
