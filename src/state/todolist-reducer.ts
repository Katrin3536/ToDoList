import {Dispatch} from 'redux';
import {todolistAPI, TodolistType} from '../api/todolist-api';
import {AppRootStateType} from './store';

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const inisialState: Array<TodolistDomainType> = [];

export const todolistReducer = (state: Array<TodolistDomainType> = inisialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOS': {
            return action.todolists.map(t => ({...t, filter: 'All'}));
        }
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {...action.todolist, filter: 'All'};
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
    todolist: TodolistType
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        todolist,
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

export type SetTodolistsActionType = {
    type: 'SET-TODOS',
    todolists: Array<TodolistType>
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOS', todolists};
};

export const fetchTodosThunkTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
        });
};

export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistID)
        .then((res) => {
            dispatch(removeTodolistAC(todolistID));
        });
};

export const addTodolistTC = (title: string,) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            const newTodolist = res.data.data.item;
            dispatch(addTodolistAC(newTodolist));
        });
};

export const changeTitleTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(id, title));
        });
};

export const changeFilterTodolistTC = (todolistID: string, filter: FilterValuesType) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistID, filter)
        .then((res) => {
            dispatch(filterChangeTodolistAC(todolistID, filter));
        });
};