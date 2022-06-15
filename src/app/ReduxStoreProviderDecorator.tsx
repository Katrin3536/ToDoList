import {Provider} from 'react-redux';
import React from 'react';
import {combineReducers} from 'redux';
import {v1} from 'uuid';
import {legacy_createStore as createStore} from 'redux';
import {AppRootStateType} from './store';
import {tasksReducer} from '../features/todolists/tasks-reducer';
import {todolistReducer} from '../features/todolists/todolist-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app:appReducer
});

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        status:'loaging'
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}
    >
        {storyFn()}
    </Provider>);
