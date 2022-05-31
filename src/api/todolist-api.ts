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
    }

}
