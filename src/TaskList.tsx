import React from 'react';
import {TaskType} from './AppWithRedux';
import { Task } from './components/Task';


type TaskListPropsType = {
    todolistID: string,
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, Taskid: string) => void,
    changeStatus: (todolistID: string, id: string, newIsDone: boolean) => void,
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
