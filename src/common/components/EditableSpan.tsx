import { ChangeEvent, useState } from "react"

type Props = {
    value: string
    onChange: (title:string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [isEditMode, setIEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(value);

    function turnOnEditMode() {
        setIEditMode(true);
    }

    function turnOffEditMode() {
        setIEditMode(false);
        onChange(title);
    }

    function onChangeTitle(e: ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            { isEditMode ? (
                <input autoFocus 
                    value={title} 
                    onChange={(e) => onChangeTitle(e)}
                    onKeyDown={(e) => e.key === 'Enter' && turnOffEditMode()}
                    onBlur={turnOffEditMode}></input>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}