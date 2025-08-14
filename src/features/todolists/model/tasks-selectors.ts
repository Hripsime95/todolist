import type { TTasks } from '../app/App';
import type { RootState } from '../app/store';

export const selectTasks = (state: RootState): TTasks => state.tasks;
