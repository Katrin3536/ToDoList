import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'feadb01b-2c7b-4c1e-86f1-b1355367b8e0'
    }
})

type TodoType = {
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

type TaskResponceType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId:  string
    order: number
    addedDate: string
}

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


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTodolist() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodolist(title: string) {
      return instance.post<ResponseType<{ item: TodoType }>>('todo-lists', {title: title})

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId:string){
        return instance.get<TaskResponceType[]>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string,title:string) {
        return instance.post<BaseResponseType<TaskResponceType>>(`todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId: string,taskId:string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string,taskId:string, model:UpdateTaskModelType) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,model)
    }

}
