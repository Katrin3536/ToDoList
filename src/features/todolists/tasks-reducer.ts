import {TodolistTaskType} from '../../app/App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolist-reducer';
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';

const inisialState: TodolistTaskType = {};

export const tasksReducer = (state: TodolistTaskType = inisialState, action: ActionsType) => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks};
        case 'SET-TODOS': {
            const stateCopy = {...state};
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = [];
            });
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskId)};
        }
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ? {...el, status: action.status} : el)
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId? {...el, title: action.title} : el)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};
        case 'REMOVE-TODOLIST':
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            return state;
    }
};

//actions
export const removeTaskAC = (todolistID: string, taskId: string) => ({type: 'REMOVE-TASK', taskId, todolistID} as const);
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const);
export const changeTaskStatusAC = (todolistID: string, taskId: string, status: TaskStatuses) =>
    ({type: 'CHANGE-TASK-STATUS', taskId, status, todolistID} as const);
export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) =>
    ({type: 'CHANGE-TASK-TITLE', taskId, title, todolistID} as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const);

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId));
        });
};
export const removeTaskTC = (todolistId: string, taskId: string,) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId));
        });
};
export const addTaskTC = (todolistId: string, title: string,) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            const newTask = res.data.data.item;
            dispatch(addTaskAC(newTask));
        });
};
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const allAppTasks = state.tasks;
        const tasksForCurrentTodo = allAppTasks[todolistId];
        const changedTask = tasksForCurrentTodo.find(el => el.id === taskId);
        if (changedTask) {
            const model: UpdateTaskModelType = {
                title: changedTask.title,
                status,
                deadline: changedTask.deadline,
                startDate: changedTask.startDate,
                description: changedTask.description,
                priority: changedTask.priority

            };
            todolistAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(todolistId, taskId, status));
                });
        }
    };
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const allAppTasks = state.tasks;
        const tasksForCurrentTodo = allAppTasks[todolistId];
        const changedTask = tasksForCurrentTodo.find(el => el.id === taskId);
        if (changedTask) {
            const model: UpdateTaskModelType = {
                title,
                status: changedTask.status,
                deadline: changedTask.deadline,
                startDate: changedTask.startDate,
                description: changedTask.description,
                priority: changedTask.priority

            };
            todolistAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskTitleAC(todolistId, taskId, title));
                });
        }
    };

//types
export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
