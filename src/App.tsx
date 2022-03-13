import React, {useState} from 'react';
import './App.css';
import ToDoList from './ToDoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    //BLL:
    const toDoListTitle_1: string = 'What to learn';

     const [tasks, setTasks]= useState([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS/ES6', isDone: true},
    {id: 3, title: 'REACT', isDone: false},
])
    // let tasks: Array<TaskType> = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 2, title: 'JS/ES6', isDone: true},
    //     {id: 3, title: 'REACT', isDone: false},
    // ];
    const removeTasks = (id: number) => {
       const filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    };

    return (
        <div className="App">
            <ToDoList title={toDoListTitle_1} tasks={tasks} removeTasks={removeTasks}/>
            {/*<ToDoList title = {toDoListTitle_2} tasks={tasks_1}/>*/}
            {/*<ToDoList title = {toDoListTitle_3} tasks={tasks_1}/>*/}

        </div>
    );
}

export default App;
