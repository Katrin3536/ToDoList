import React from 'react';
import {Task} from '../Task/Task';
import {DomainTaskType, TaskStatuses} from '../../../api/todolists-api';


type TaskListPropsType = {
    todolistID: string,
    tasks: Array<DomainTaskType>
    removeTasks: (todolistID: string, Taskid: string) => void,
    changeStatus: (todolistID: string, id: string, status: TaskStatuses) => void,
    onChangeTitle: (todolistID: string, Taskid: string, title: string) => void

}

export const TasksList = React.memo((props: TaskListPropsType) => {

    const tasksJSElements = props.tasks?.map(t => <Task key={t.id}
                                                        onChangeTitle={props.onChangeTitle}
                                                        removeTasks={props.removeTasks}
                                                        todolistID={props.todolistID}
                                                        changeStatus={props.changeStatus}
                                                        task={t}
        />
    );
    return (
        <div>
            {tasksJSElements}
        </div>
    );
});
