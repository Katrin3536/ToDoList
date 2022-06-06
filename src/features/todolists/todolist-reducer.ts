import {Dispatch} from 'redux';
import {todolistAPI, TodolistType} from '../../api/todolist-api';
import {AppRootStateType} from '../../app/store';

const inisialState: Array<TodolistDomainType> = [];

export const todolistReducer = (state: Array<TodolistDomainType> = inisialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOS':
            return action.todolists.map(t => ({...t, filter: 'All'}));
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state, {...action.todolist, filter: 'All'}];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        default:
            return state;
    }
};

//actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType)=> ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTitleTodolistAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const filterChangeTodolistAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>)=> ({type: 'SET-TODOS', todolists} as const)

//thunks
export const fetchTodosThunkTC = () => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
        });
};
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTodolist(todolistID)
        .then((res) => {
            dispatch(removeTodolistAC(todolistID));
        });
};
export const addTodolistTC = (title: string,) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            const newTodolist = res.data.data.item;
            dispatch(addTodolistAC(newTodolist));
        });
};
export const changeTitleTodolistTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(id, title));
        });
};
export const changeFilterTodolistTC = (todolistID: string, filter: FilterValuesType) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(todolistID, filter)
        .then((res) => {
            dispatch(filterChangeTodolistAC(todolistID, filter));
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
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
