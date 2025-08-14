import { List } from "@mui/material";
import { TTask, TTasks } from "../TodoListItem";
import { TaskItem } from "./TaskItem/TaskItem";

type TProps = {
    id: string,
    tasks: TTask[]
}

export const Tasks = (props: TProps) => {

    const {id, tasks} = props

    return (
        <>
            {tasks.length === 0 ? (
                <p> Тасок нет </p>
            ) : (
            <List>
                {tasks.map(task => {
                    return (
                        <TaskItem key={task.id} todoListId={id} task={task}/>
                    );
                })}
            </List>
            )}
        </>
    )
}