import {Dispatch} from 'redux';
import {todolistsApi, TodolistType} from '../../api/todolists-api';
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer';
import {AppRootStateType} from '../../app/store';
import {AxiosError} from 'axios';
import {handleNetworkError} from '../../utils/errorUtils';


const inisialState: Array<TodolistDomainType> = [];

export const todolistReducer = (state: Array<TodolistDomainType> = inisialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'TODOLIST/SET-TODOS':
            return action.todolists.map(t => ({...t, filter: 'All', entityStatus: 'idle'}));
        case 'TODOLIST/REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'TODOLIST/ADD-TODOLIST':
            return [...state, {...action.todolist, filter: 'All', entityStatus: 'idle'}];
        case 'TODOLIST/CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        case 'TODOLIST/CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(el=>el.id === action.id? {...el, entityStatus:  action.entityStatus} : el)
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
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const);

//thunks
export const fetchTodosThunkTC = () => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'));
    todolistsApi.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((err:AxiosError)=>{
            handleNetworkError(dispatch, err.message)
        });
};
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todolistID,'loading'))
    todolistsApi.deleteTodolist(todolistID)
        .then((res) => {
            dispatch(removeTodolistAC(todolistID));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((err:AxiosError)=>{
            handleNetworkError(dispatch, err.message)
        });
};
export const addTodolistTC = (title: string,) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]));
                } else {
                    dispatch(setAppErrorAC('Some error occurred'));
                }
                dispatch(setAppStatusAC('failed'));
            }
        })
        .catch((err:AxiosError)=>{
            handleNetworkError(dispatch, err.message)
        });
};
export const changeTitleTodolistTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistsApi.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(id, title));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((err:AxiosError)=>{
            handleNetworkError(dispatch, err.message)
        });
};
export const changeFilterTodolistTC = (todolistID: string, filter: FilterValuesType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistsApi.updateTodolist(todolistID, filter)
        .then((res) => {
            dispatch(filterChangeTodolistAC(todolistID, filter));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((err:AxiosError)=>{
            handleNetworkError(dispatch, err.message)
        });
};

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof filterChangeTodolistAC>
    | SetTodolistsActionType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ChangeTodolistEntityStatusActionType
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
