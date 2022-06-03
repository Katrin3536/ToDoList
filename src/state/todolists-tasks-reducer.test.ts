import  {TodolistTaskType} from '../AppWithRedux';
import {addTodolistAC, TodolistDomainType, todolistReducer} from './todolist-reducer';
import {tasksReducer} from './tasks-reducer';
import { TodolistType } from '../api/todolist-api';

test('ids should be equals', () => {
    const startTasksState: TodolistTaskType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolist = endTodolistsState[0].id;


    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolist).toBe(action.todolistID)
    expect(idFromTasks).toBe(idFromTodolist);
})