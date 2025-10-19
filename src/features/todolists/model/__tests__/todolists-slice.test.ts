import { v1 } from 'uuid';
import { beforeEach, expect, test } from 'vitest';
import {
  changeTodolistFilterAC,
  changeTodolistTitle,
  createTodolist,
  deleteTodolist,
  todolistsReducer,
} from '../todolists-slice';

import type { DomainTodolist } from '../todolists-slice';
import { TFilter } from '../../ui/Todolists/Todolists';

let todolistId1: string;
let todolistId2: string;
let startState: DomainTodolist[] = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      addedDate: '',
      order: 0,
      filter: 'all',
    },
    {
      id: todolistId2,
      title: 'What to buy',
      addedDate: '',
      order: 0,
      filter: 'all',
    },
  ];
});

test('correct todolist should be deleted', () => {
  const endState = todolistsReducer(
    startState,
    deleteTodolist.fulfilled({ id: todolistId1 }, 'requestId', {
      id: todolistId1,
    }),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be created', () => {
  const title = 'New todolist';
  const endState = todolistsReducer(
    startState,
    createTodolist.fulfilled(
      { todolist: { id: v1(), title, addedDate: '', order: 0 } },
      'requestId',
      { title },
    ),
  );

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(title);
});

test('correct todolist should change its title', () => {
  const title = 'New title';
  const endState = todolistsReducer(
    startState,
    changeTodolistTitle.fulfilled({ id: todolistId2, title }, 'requestId', {
      id: todolistId2,
      title,
    }),
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(title);
});

test('correct todolist should change its filter', () => {
  const filter: TFilter = 'completed';
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({ id: todolistId2, filter }),
  );

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(filter);
});
