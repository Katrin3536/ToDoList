import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTitleTodolistAC, filterChangeTodolistAC,
    removeTodolistAC,
    todolistReducer
} from './todolist-reducer';
import {FilterValuesType, TodolistsType} from '../AppWithRedux';


let startState: Array<TodolistsType> = [];
let todolistID1: string;
let todolistID2: string;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistID1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
    const titleNewTodolist = 'New Todolist';
    const endState = todolistReducer(startState, addTodolistAC(titleNewTodolist));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('New Todolist');
});

test('correct todolist should change its title', () => {
    const titleNewTodolist = 'New Todolist';
    const endState = todolistReducer(startState, changeTitleTodolistAC(todolistID2, titleNewTodolist));
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(titleNewTodolist);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'Completed';
    const endState = todolistReducer(startState, filterChangeTodolistAC(todolistID2, newFilter));
    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});
