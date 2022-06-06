import {TodolistTaskType} from '../AppWithRedux';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolist-reducer';
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const inisialState: TodolistTaskType = {};

export const tasksReducer = (state: TodolistTaskType = inisialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks};
        }
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
            const stateCopy = {...state};
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskId ? {
                    ...el,
                    status: action.status
                } : el)
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};
        case 'REMOVE-TODOLIST' :
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            return state;
    }
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistID
    } as const;
};

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const;
};

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        status,
        todolistID
    } as const;
};

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistID
    } as const;
};

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId};
};
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items;
                dispatch(setTasksAC(res.data.items, todolistId));
            });
    };
};

export const removeTaskTC = (todolistId: string, taskId: string,) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId));
        });
};

export const addTaskTC = (todolistId: string, title: string,) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            const newTask = res.data.data.item;
            dispatch(addTaskAC(newTask));
        });
};

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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