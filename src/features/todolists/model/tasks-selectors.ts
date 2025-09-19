import { RootState } from '@/app/store';
import { TTasks } from '../ui/Todolists/TodolistItem/TodoListItem';

export const selectTasks = (state: RootState): TTasks => state.tasks;
