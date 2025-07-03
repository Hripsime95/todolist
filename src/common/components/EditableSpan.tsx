import { TextField } from "@mui/material"
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
                <TextField autoFocus
                    variant="outlined"
                    size="small"
                    value={title} 
                    onChange={onChangeTitle}
                    onKeyDown={(e) => e.key === 'Enter' && turnOffEditMode()}
                    onBlur={turnOffEditMode}></TextField>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}