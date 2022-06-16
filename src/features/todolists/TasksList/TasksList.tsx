import React from 'react';
import {Task} from '../Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {RequestStatusType} from '../../../app/app-reducer';


type TaskListPropsType = {
    todolistID: string,
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, Taskid: string) => void,
    changeStatus: (todolistID: string, id: string, status: TaskStatuses) => void,
    onChangeTitle: (todolistID: string, Taskid: string, title: string) => void
    entityStatus: RequestStatusType
}

export const TasksList = React.memo((props: TaskListPropsType) => {

    const tasksJSElements = props.tasks?.map(t => <Task key={t.id}
                                                        onChangeTitle={props.onChangeTitle}
                                                        removeTasks={props.removeTasks}
                                                        todolistID={props.todolistID}
                                                        changeStatus={props.changeStatus}
                                                        task={t}
                                                        entityStatus={props.entityStatus}
        />
    );
    return (
        <div>
            {tasksJSElements}
        </div>
    );
});
