export type TTask = {
    id: string,
    type: string,
    isDone: boolean,
    title: string
}

export type TTodoList = {
    title: string,
    tasks: TTask[],
    removeTask: (id: string) => void,
    filterTasks: (filter: TTaskFilter) => void
}

export type TTaskFilter = 'all' | 'active' | 'completed';