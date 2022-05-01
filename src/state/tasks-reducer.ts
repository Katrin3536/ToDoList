import {TodolistTaskType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolist-reducer';

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TodolistTaskType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskId)};
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]};
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolistID]: []};
        case 'REMOVE-TODOLIST' :
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            throw new Error('Incorrect type');
    }
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistID
    } as const;
};

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistID,
    } as const;
};

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistID
    } as const;
};

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistID
    } as const;
};