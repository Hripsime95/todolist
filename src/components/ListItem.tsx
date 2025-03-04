import { TTask } from "./types/type"

export const ListItem = (props: TTask) => {
    const { id, type, title, isChecked } = props;
    return (
        <li>
            <input key={id} type={type} checked={isChecked}/> <span>{title}</span>
            <button>x</button>
        </li>
    )
}