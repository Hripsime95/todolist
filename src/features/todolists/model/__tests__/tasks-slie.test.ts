import { beforeEach, expect, test } from 'vitest';
import {
  updateTask,
  createTask,
  deleteTask,
  tasksReducer,
} from '../tasks-slice';
import { createTodolist, deleteTodolist } from '../todolists-slice';
import { TTasks } from '../../ui/Todolists/TodolistItem/TodoListItem';
import { TaskPriority, TaskStatus } from '@/common/enums';
import { v1 } from 'uuid';

let startState: TTasks = {};

const taskDefaultValues = {
  description: '',
  deadline: '',
  addedDate: '',
  startDate: '',
  priority: TaskPriority.Low,
  order: 0,
};

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
    ],
  };
});

test('array should be created for new todolist', () => {
  const title = 'New todolist';
  const endState = tasksReducer(
    startState,
    createTodolist.fulfilled(
      { todolist: { id: v1(), title, addedDate: '', order: 0 } },
      'requestId',
      { title },
    ),
  );

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('New key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(
    startState,
    deleteTodolist.fulfilled({ id: 'todolistId2' }, 'requestId', {
      id: 'todolistId2',
    }),
  );

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).not.toBeDefined();
  // or
  expect(endState['todolistId2']).toBeUndefined();
});

test('correct task should be deleted', () => {
  const endState = tasksReducer(
    startState,
    deleteTask.fulfilled(
      { todolistId: 'todolistId2', taskId: '2' },
      'requestId',
      { todolistId: 'todolistId2', taskId: '2' },
    ),
  );

  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
    ],
  });
});

test('correct task should be created at correct array', () => {
  const endState = tasksReducer(
    startState,
    createTask.fulfilled(
      {
        task: {
          id: '4',
          title: 'juice',
          status: TaskStatus.Completed,
          todoListId: 'todolistId2',
          ...taskDefaultValues,
        },
      },
      'requestId',
      {
        todolistId: 'todolistId2',
        title: 'juice',
      },
    ),
  );

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe('juice');
});

test('correct task should change its title', () => {
  const endState = tasksReducer(
    startState,
    updateTask.fulfilled(
      {
        task: {
          id: '3',
          title: 'Redux',
          status: TaskStatus.New,
          todoListId: 'todolistId1',
          ...taskDefaultValues,
        },
      },
      'requestId',
      {
        todolistId: 'todolistId1',
        taskId: '3',
        domainModel: { title: 'Redux' },
      },
    ),
  );

  expect(endState.todolistId1[2].title).toBe('Redux');
});

test('correct task should change its status', () => {
  const endState = tasksReducer(
    startState,
    updateTask.fulfilled(
      {
        task: {
          id: '2',
          title: 'Redux',
          status: TaskStatus.New,
          todoListId: 'todolistId1',
          ...taskDefaultValues,
        },
      },
      'requestId',
      {
        todolistId: 'todolistId1',
        taskId: '2',
        domainModel: { status: TaskStatus.New },
      },
    ),
  );

  expect(endState.todolistId1[2].status).toBe(TaskStatus.New);
});
