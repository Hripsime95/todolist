import { beforeEach, expect, test } from 'vitest'
import { TTasks } from '../app/App'
import { changeTaskNameAC, changeTaskStatusAC, createTaskAC, deleteTaskAC, tasksReducer } from './tasks-reducer'
import { createTodolistAC, deleteTodolistAC } from './todolists-reducer'


let startState: TTasks = {}
 
beforeEach(() => {
  startState = {
    todolistId1: [
      {id: '1', name: 'CSS', isDone: false},
      {id: '2', name: 'JS', isDone: true},
      {id: '3', name: 'React', isDone: false},
    ],
    todolistId2: [
      {id: '1', name: 'bread', isDone: false},
      {id: '2', name: 'milk', isDone: true},
      {id: '3', name: 'tea', isDone: false},
    ],
  }
})

test('array should be created for new todolist', () => {
  const endState = tasksReducer(startState, createTodolistAC('New todolist'))
 
  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('New key should be added')
  }
 
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, deleteTodolistAC({id: 'todolistId2'}))
 
  const keys = Object.keys(endState)
 
  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
  // or
  expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
  const endState = tasksReducer(
    startState,
    deleteTaskAC({ todolistId: 'todolistId2', taskId: '2' })
  )
 
  expect(endState).toEqual({
    todolistId1: [
      { id: '1', name: 'CSS', isDone: false },
      { id: '2', name: 'JS', isDone: true },
      { id: '3', name: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', name: 'bread', isDone: false },
      { id: '3', name: 'tea', isDone: false },
    ],
  })
})

test('correct task should be created at correct array', () => {
  const endState = tasksReducer(
    startState,
    createTaskAC({
      todolistId: 'todolistId2',
      name: 'juice',
    })
  )
 
  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].name).toBe('juice')
  expect(endState.todolistId2[0].isDone).toBe(false)
})

test('correct task should change its title', () => {
    const endState = tasksReducer(
        startState,
        changeTaskNameAC({
            todolistId: 'todolistId1',
            taskId: '3',
            name: 'Redux'
        })
    )

    expect(endState.todolistId1[2].name).toBe('Redux')
})

test('correct task should change its status', () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            todolistId: 'todolistId1',
            taskId: '3'
        })
    )

    expect(endState.todolistId1[2].isDone).toBe(true)
})