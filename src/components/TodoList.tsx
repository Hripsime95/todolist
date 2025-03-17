import { ListItem } from "./ListItem"
import { TTodoList } from "./types/type"

export const TodoList = (props:TTodoList) => {
    return (
        <div>
          <h3>{props.title}</h3>
          <div>
            <input/>
            <button>+</button>
          </div>
          <ul>
            {
                props.tasks.map((t) => {
                    return (
                        <ListItem task={t} removeTask={props.removeTask}/>
                    )
                } )
            }
          </ul>
          <div>
            <button onClick={()=>props.filterTasks('all')}>All</button>
            <button onClick={()=>props.filterTasks('active')}>Active</button>
            <button onClick={()=>props.filterTasks('completed')}>Completed</button>
          </div>
        </div>
    )
}