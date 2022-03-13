import React from 'react';
import {TaskType} from "./App";
import Button from './Button';

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTasks: (id: number) => void
}
   // const TaskList : React.FC<TaskListPropsType> = (props ) -второй вариант передачи пропсов
const TaskList = (props:TaskListPropsType) => {
    // const tasks = props.tasks - использование деструктуризации, вместо пропс.таскс использовать таскс.

    const tasksJSElements = props.tasks.map(t => {
        const onClickRemoveTask =()=>props.removeTasks(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button title={"X"} onClickRemoveTask={onClickRemoveTask}/>
                {/*<button onClick={onClickRemoveTask}>X</button>*/}
            </li>
        )
    })
    return (
        <ul>
            {tasksJSElements}
        </ul>
    );
};

export default TaskList;