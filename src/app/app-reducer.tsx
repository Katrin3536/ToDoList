import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/login/auth-reducer';
import {Dispatch} from 'redux';
import {handleAppError, handleNetworkError} from '../utils/errorUtils';
import {AxiosError} from 'axios';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
};

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state;
    }
};

export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const);
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setIsInitializedAC(true))
        } else {
            handleAppError(dispatch, res.data);
        }
    })
        .catch((err: AxiosError) => {
            handleNetworkError(dispatch, err.message);
        });
};


export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
export type ActionsType = SetAppStatusActionType | SetAppErrorActionType | setIsInitializedActionType