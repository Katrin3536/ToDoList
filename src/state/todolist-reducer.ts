import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeTodolistFilterActionType

export const todolistReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodolist = {id: v1(), title: action.title, filter: 'All'};
            return [...state, newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        default:
            throw new Error('Incorrect type');
    }
};

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const;
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title
    } as const;
};

export type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export const changeTitleTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const;
};

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export const filterChangeTodolistAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const;
};