import {TodolistTaskType} from '../../app/App';
import {addTodolistAC, TodolistDomainType, todolistReducer} from './todolist-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TodolistTaskType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        id: '555',
        order: 0,
        title: 'Hello',
        addedDate: ''
    });

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolist = endTodolistsState[0].id;


    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolist).toBe(action.todolist.id);
    expect(idFromTasks).toBe(idFromTodolist);
});