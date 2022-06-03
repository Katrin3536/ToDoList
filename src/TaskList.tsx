import React from 'react';
import { Task } from './components/Task';
import {TaskStatuses, TaskType} from './api/todolist-api';


type TaskListPropsType = {
    todolistID: string,
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, Taskid: string) => void,
    changeStatus: (todolistID: string, id: string, status: TaskStatuses) => void,
    onChangeTitle: (todolistID: string, Taskid: string, title: string) => void
}

export const TaskList = React.memo((props:TaskListPropsType) => {

    const tasksJSElements = props.tasks.map(t => <Task onChangeTitle={props.onChangeTitle}
                                                       removeTasks={props.removeTasks}
                                                       todolistID={props.todolistID}
                                                       changeStatus={props.changeStatus}
                                                       task={t}/>)
    return (
        <div>
            {tasksJSElements}
        </div>
    );
})
