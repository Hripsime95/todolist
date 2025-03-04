import { ListItem } from "./ListItem"
import { TTodoList } from "./types/type"


export const TodoList = (props:TTodoList) => {
    return (
        <div>
          <h3>props.title</h3>
          <div>
            <input/>
            <button>+</button>
          </div>
          <ul>
            {
                props.tasks.map((task) => {
                    return (
                        <ListItem id={task?.id} type={task?.type} title={task?.title} isChecked={task?.isChecked}/>
                    )
                } )
            }
          </ul>
          <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
        </div>
    )
}