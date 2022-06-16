import {Provider} from 'react-redux';
import React from 'react';
import {combineReducers} from 'redux';
import {v1} from 'uuid';
import {legacy_createStore as createStore} from 'redux';
import {AppRootStateType} from './store';
import {tasksReducer} from '../features/todolists/tasks-reducer';
import {todolistReducer} from '../features/todolists/todolist-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app:appReducer
});

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                addedDate: '',
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low,
                entityStatus: 'idle',
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                addedDate: '',
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low,
                entityStatus: 'idle',
            }
        ]
    },
    app: {
        status:'loaging',
        error: null
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}
    >
        {storyFn()}
    </Provider>);
