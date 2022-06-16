import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTitleTodolistAC, filterChangeTodolistAC,
    FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistReducer
} from './todolist-reducer';

let startState: Array<TodolistDomainType> = [];
let todolistID1: string;
let todolistID2: string;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'All', addedDate:'', order: 0, entityStatus:'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'All', addedDate:'', order: 0, entityStatus:'idle'},
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistID1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
    const titleNewTodolist = {
        id: "555",
        order:0,
        title: "Hello",
        addedDate:""
    }
    const endState = todolistReducer(startState, addTodolistAC(titleNewTodolist));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("Hello");
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

test('todolist should be set to the state', () => {
    const action = setTodolistsAC(startState)
    const endState = todolistReducer([], action);
    expect(endState.length).toBe(2);
});
