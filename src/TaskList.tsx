import React from 'react';
import {TaskType} from './App';
import Button from './Button';

type TaskListPropsType = {
    todolistID: string,
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, Taskid: string) => void,
    changeStatus: (todolistID: string, id: string, newIsDone: boolean) => void;
}
// const TaskList : React.FC<TaskListPropsType> = (props ) -второй вариант передачи пропсов
const TaskList: React.FC<TaskListPropsType> = (props) => {
    // const tasks = props.tasks - использование деструктуризации, вместо пропс.таскс использовать таскс.

    const tasksJSElements = props.tasks.map(t => {
        const onClickRemoveTask = () => props.removeTasks(props.todolistID, t.id);
        return (
            <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={(e) => props.changeStatus(props.todolistID, t.id, e.currentTarget.checked)}
                />
                <span>{t.title}</span>
                <Button title={'X'} onClickHandler={onClickRemoveTask}/>
                {/*<button onClick={onClickRemoveTask}>X</button>*/}
            </li>
        );
    });
    return (
        <ul>
            {tasksJSElements}
        </ul>
    );
};

export default TaskList;