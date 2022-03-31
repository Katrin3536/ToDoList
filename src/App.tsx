import React, {useState} from 'react';
import './App.css';
import ToDoList from './ToDoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TodolistTaskType = {
    [key: string]: Array<TaskType>
}

function App() {
    // CRUD
    // C-create(post)
    // R-read(get)
    // U-update(put,patch)
    // D-delete(delete)

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]);

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID));
    };


    const [tasks, setTasks] = useState<TodolistTaskType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS/ES6', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'toys', isDone: true},
            {id: v1(), title: 'book', isDone: false},
            {id: v1(), title: 'fruits', isDone: false},
        ],
    });

    const removeTasks = (todolistID: string, Taskid: string) => {
        // const filteredTasks = tasks.filter(t => t.id !== id);
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== Taskid)});
    };

    const addTask = (todolistID: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title, //title: title синтаксис новый при повторении пишется одно значение
            isDone: false,
        };
        //     const copy = ([newTask, ...tasks]);
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    };

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter} : el));
        // setFilter(filter);
    };

    const changeStatus = (todolistID: string, id: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === id ? {...el, isDone: newIsDone} : el)});
        // const updatedTasks = tasks.map(t => t.id === id ? {...t, isDone: newisDone} : t);
        // setTasks(updatedTasks);
    };

    return (
        <div className="App">
            {todolists.map(el => {

                let taskForToDoList;
                switch (el.filter) {
                    case 'Active':
                        taskForToDoList = tasks[el.id].filter(t => t.isDone === false);
                        break;
                    case 'Completed':
                        taskForToDoList = tasks[el.id].filter(t => t.isDone === true);
                        break;
                    default:
                        taskForToDoList = tasks[el.id];
                }

                return <ToDoList
                    key={el.id}
                    todolistID={el.id}
                    filter={el.filter}
                    titleEL={el.title}
                    tasks={taskForToDoList}
                    removeTasks={removeTasks}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                />;
            })}

        </div>
    );
}

export default App;
