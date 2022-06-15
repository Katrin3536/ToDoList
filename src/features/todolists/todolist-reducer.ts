import {Dispatch} from 'redux';
import {todolistAPI, TodolistType} from '../../api/todolist-api';
import {setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {AppRootStateType} from '../../app/store';

const inisialState: Array<TodolistDomainType> = [];

export const todolistReducer = (state: Array<TodolistDomainType> = inisialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'TODOLIST/SET-TODOS':
            return action.todolists.map(t => ({...t, filter: 'All'}));
        case 'TODOLIST/REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'TODOLIST/ADD-TODOLIST':
            return [...state, {...action.todolist, filter: 'All'}];
        case 'TODOLIST/CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        case 'TODOLIST/CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        default:
            return state;
    }
};

//actions
export const removeTodolistAC = (id: string) => ({type: 'TODOLIST/REMOVE-TODOLIST', id} as const);
export const addTodolistAC = (todolist: TodolistType) => ({type: 'TODOLIST/ADD-TODOLIST', todolist} as const);
export const changeTitleTodolistAC = (id: string, title: string) =>
    ({type: 'TODOLIST/CHANGE-TODOLIST-TITLE', id, title} as const);
export const filterChangeTodolistAC = (id: string, filter: FilterValuesType) =>
    ({type: 'TODOLIST/CHANGE-TODOLIST-FILTER', id, filter} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'TODOLIST/SET-TODOS', todolists} as const);

//thunks
export const fetchTodosThunkTC = () => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
        });
};
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTodolist(todolistID)
        .then((res) => {
            dispatch(removeTodolistAC(todolistID));
            dispatch(setAppStatusAC('succeeded'));
        });
};
export const addTodolistTC = (title: string,) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
        });
};
export const changeTitleTodolistTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(id, title));
            dispatch(setAppStatusAC('succeeded'));
        });
};
export const changeFilterTodolistTC = (todolistID: string, filter: FilterValuesType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistID, filter)
        .then((res) => {
            dispatch(filterChangeTodolistAC(todolistID, filter));
            dispatch(setAppStatusAC('succeeded'));
        });
};

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof filterChangeTodolistAC>
    | SetTodolistsActionType
    | SetAppStatusActionType
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
