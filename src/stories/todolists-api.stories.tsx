import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('New Todolist')
            .then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a3bcd2e4-b0cf-4a0a-9ec2-c53689720b45';
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1dc2dc15-2263-4fac-9106-6a7b346150b7'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

