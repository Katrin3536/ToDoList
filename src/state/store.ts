import {todolistReducer} from './todolist-reducer';
import {tasksReducer} from './tasks-reducer';
import {combineReducers , legacy_createStore as createStore} from 'redux'

let rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)
//@ts-ignore
window.store = store
