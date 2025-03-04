export type TTask = {
    id: string,
    type: string,
    isChecked: boolean,
    title: string
}

export type TTodoList = {
    title: string,
    tasks: TTask[],
}