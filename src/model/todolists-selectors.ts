import type { TTodolist } from "../app/App";
import type { RootState } from "../app/store";

export const selectTodolists = (state: RootState): TTodolist[] => state.todolists;