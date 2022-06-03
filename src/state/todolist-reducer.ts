import {v1} from 'uuid';
import { TodolistType } from '../api/todolist-api';

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeTodolistFilterActionType

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const inisialState:Array<TodolistDomainType>= []

export const todolistReducer = (state: Array<TodolistDomainType> = inisialState, action: ActionType):Array<TodolistDomainType>  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodolist:TodolistDomainType = {id: action.todolistID, title: action.title, filter: 'All', addedDate:"", order:0};
            return [...state, newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        default:
            return state;
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
    title: string,
    todolistID: string
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistID: v1()
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