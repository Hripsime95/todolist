import { List } from '@mui/material';
import { TaskItem } from './TaskItem/TaskItem';
import { TFilter } from '../../Todolists';
import { DomainTask } from '@/features/todolists/api/tasksApi.types';
import { TaskStatus } from '@/common/enums';
import { useFetchTasksQuery } from '@/features/todolists/api/tasksApi';

type TProps = {
  id: string;
  filter: TFilter;
};

export const Tasks = (props: TProps) => {
  const { id, filter } = props;

  const { data: tasks } = useFetchTasksQuery(id);
  let filteredTasks = getFilteredTasks(filter);

  function getFilteredTasks(filter: TFilter) {
    let fTasks = tasks?.items;
    if (filter === 'active')
      fTasks = tasks?.items.filter(
        (t: DomainTask) => t.status == TaskStatus.New,
      );
    if (filter === 'completed')
      fTasks = tasks?.items.filter(
        (t: DomainTask) => t.status == TaskStatus.Completed,
      );
    return fTasks;
    return [];
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p> Тасок нет </p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem key={task.id} todolistId={id} task={task} />;
          })}
        </List>
      )}
    </>
  );
};
