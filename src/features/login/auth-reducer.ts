import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleAppError, handleNetworkError} from '../../utils/errorUtils';
import {AxiosError} from 'axios';
import {ClearDataActionType, clearTodolistsDataAC} from '../todolists/todolist-reducer';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleAppError(dispatch, res.data);
            }
        })
        .catch((err: AxiosError) => {
            handleNetworkError(dispatch, err.message);
        });
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearTodolistsDataAC())
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleNetworkError( dispatch, error)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ClearDataActionType


