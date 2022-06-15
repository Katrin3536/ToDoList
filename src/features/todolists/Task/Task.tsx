import  IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Delete from '@mui/icons-material/Delete';
import React, {FC, useCallback} from 'react';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import {TaskStatuses, TaskType } from '../../../api/todolist-api';


export type TaskPropsType = {
    todolistID: string,
    removeTasks: (todolistID: string, Taskid: string) => void,
    changeStatus: (todolistID: string, id: string, status: TaskStatuses) => void,
    onChangeTitle: (todolistID: string, Taskid: string, title: string) => void,
    task: TaskType
}

export const Task: FC<TaskPropsType> = React.memo((props) => {

    const onClickRemoveTask = () => props.removeTasks(props.todolistID, props.task.id);
    const changeTitle = useCallback((title: string) => {
        props.onChangeTitle(props.todolistID, props.task.id, title);
    },[props.onChangeTitle,props.todolistID, props.task.id])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox
                color={'primary'}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={(e) => props.changeStatus(props.todolistID, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}
            />
            <EditableSpan title={props.task.title} callback={changeTitle}/>
            <IconButton onClick={onClickRemoveTask}>
                <Delete />
            </IconButton>
        </div>
    );
});



