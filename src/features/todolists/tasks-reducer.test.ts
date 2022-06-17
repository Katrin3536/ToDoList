import {TodolistTaskType} from '../../app/App';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolist-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';

let startState: TodolistTaskType = {};

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
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
                id: '2',
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
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
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
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
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
                id: '2',
                title: 'milk',
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
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                addedDate: '',
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2', '2');
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
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
                id: '2',
                title: 'JS',
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
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                addedDate: '',
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                addedDate: '',
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                addedDate: '',
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low
            }
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        todoListId: 'todolistId2',
        deadline: '',
        status: TaskStatuses.New,
        description: '',
        order: 0,
        startDate: '',
        addedDate: '',
        id: 'sdf',
        title: 'juice',
        priority: 0,
    });

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].status).toBe(0);
});
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New);
    const endState = tasksReducer(startState, action);
    expect(endState['todolistId2'][1].status).toBe(0);
    expect(endState['todolistId1'][1].status).toBe(2);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('todolistId2', '2', 'chocolate');

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe('chocolate');
    expect(endState['todolistId1'][1].title).toBe('JS');

});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: '555',
        order: 0,
        title: 'Hello',
        addedDate: ''
    });
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0}]);

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added for todolists', () => {
    const action = setTasksAC(startState['todolistId1'], 'todolistId1');

    const endState = tasksReducer({'todolistId1': []}, action);

    expect(endState['todolistId1'].length).toBe(3);
});