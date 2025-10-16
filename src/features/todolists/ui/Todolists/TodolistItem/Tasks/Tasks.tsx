import { List } from '@mui/material';
import { TaskItem } from './TaskItem/TaskItem';
import { TFilter } from '../../Todolists';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { selectTasks } from '@/features/todolists/model/tasks-selectors';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchTasks } from '@/features/todolists/model/tasks-slice';
import { DomainTask } from '@/features/todolists/api/tasksApi.types';
import { TaskStatus } from '@/common/enums';

type TProps = {
  id: string;
  filter: TFilter;
};

export const Tasks = (props: TProps) => {
  const { id, filter } = props;

  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  let filteredTasks = getFilteredTasks(filter);

  function getFilteredTasks(filter: TFilter) {
    let fTasks = tasks[id];
    if (filter === 'active')
      fTasks = tasks[id].filter((t: DomainTask) => t.status == TaskStatus.New);
    if (filter === 'completed')
      fTasks = tasks[id].filter(
        (t: DomainTask) => t.status == TaskStatus.Completed,
      );

    return fTasks;
  }

  useEffect(() => {
    dispatch(fetchTasks(id));
  }, []);

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p> Тасок нет </p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem key={task.id} todoListId={id} task={task} />;
          })}
        </List>
      )}
    </>
  );
};
