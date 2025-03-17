import { TTask } from "./types/type";

type TListItem = {
    task: TTask,
    removeTask: Function
}

export const ListItem = (props: TListItem) => {
    const { task, removeTask } = props;
    return (
        <li>
            <input key={task.id} type={task.type} checked={task.isDone}/> <span>{task.title}</span>
            <button onClick={() => removeTask(task.id)}>x</button>
        </li>
    )
}