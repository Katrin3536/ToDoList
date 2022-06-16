import {ActionsType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolists-api';

export const handleNetworkError = (dispatch:Dispatch<ActionsType>, message:string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleAppError = <T>(dispatch:Dispatch<ActionsType>,data:ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error occurred'));
    }
    dispatch(setAppStatusAC('failed'));
}