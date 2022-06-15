import {TodolistTaskType} from '../../app/App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolist-reducer';
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';

const inisialState: TodolistTaskType = {};

export const tasksReducer = (state: TodolistTaskType = inisialState, action: ActionsType) => {
    switch (action.type) {
        case 'TASKS/SET-TASKS':
            return {...state, [action.todolistId]: action.tasks};
        case 'TODOLIST/SET-TODOS': {
            const stateCopy = {...state};
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = [];
            });
            return stateCopy;
        }
        case 'TASKS/REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskId)};
        }
        case 'TASKS/ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'TASKS/CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ? {...el, status: action.status} : el)
            };
        case 'TASKS/CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ? {...el, title: action.title} : el)
            };
        case 'TODOLIST/ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};
        case 'TODOLIST/REMOVE-TODOLIST':
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            return state;
    }
};

//actions
export const removeTaskAC = (todolistID: string, taskId: string) => ({
    type: 'TASKS/REMOVE-TASK',
    taskId,
    todolistID
} as const);
export const addTaskAC = (task: TaskType) => ({type: 'TASKS/ADD-TASK', task} as const);
export const changeTaskStatusAC = (todolistID: string, taskId: string, status: TaskStatuses) =>
    ({type: 'TASKS/CHANGE-TASK-STATUS', taskId, status, todolistID} as const);
export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) =>
    ({type: 'TASKS/CHANGE-TASK-TITLE', taskId, title, todolistID} as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'TASKS/SET-TASKS',
    tasks,
    todolistId
} as const);

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId));
            dispatch(setAppStatusAC('succeeded'));
        });
};
export const removeTaskTC = (todolistId: string, taskId: string,) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId));
            dispatch(setAppStatusAC('succeeded'));
        });
};
export const addTaskTC = (todolistId: string, title: string,) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
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
            dispatch(setAppStatusAC('loading'));
            todolistAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(todolistId, taskId, status));
                    dispatch(setAppStatusAC('succeeded'));
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
            dispatch(setAppStatusAC('loading'));
            todolistAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskTitleAC(todolistId, taskId, title));
                    dispatch(setAppStatusAC('succeeded'));
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
    | SetAppStatusActionType
