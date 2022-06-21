import axios, { AxiosResponse } from 'axios';
import {RequestStatusType} from '../app/app-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'feadb01b-2c7b-4c1e-86f1-b1355367b8e0'
    }
});

//api
export const todolistsApi = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title});
    },
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }

};

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: string }>>>('auth/login',data);
    },
    me(){
        return instance.get<ResponseType<{id:string, email:string,login:string}>>('auth/me');
    },
    logout(){
        return instance.delete<ResponseType>('auth/login')
    }

}


//types
export type  LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type DomainTaskType =  TaskType & { entityStatus: RequestStatusType }

export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type UpdateTaskModelType = {
    deadline: string,
    startDate: string,
    priority: number,
    status: number,
    title: string,
    description: string,
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}