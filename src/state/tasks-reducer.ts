import {TodolistTaskType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolist-reducer';

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const inisialState:TodolistTaskType= {}

export const tasksReducer = (state: TodolistTaskType = inisialState, action: ActionType) => {
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
            return state;
    }
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistID
    } as const;
};

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = ( todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistID,
    } as const;
};

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskId: string, isDone: boolean, ) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistID
    } as const;
};

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string ) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistID
    } as const;
};