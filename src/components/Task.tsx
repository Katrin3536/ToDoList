import {Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import React, {FC, useCallback} from 'react';
import EditableSpan from './EditableSpan';
import { TaskType } from '../AppWithRedux';

export type TaskPropsType = {
    todolistID: string,
    removeTasks: (todolistID: string, Taskid: string) => void,
    changeStatus: (todolistID: string, id: string, newIsDone: boolean) => void,
    onChangeTitle: (todolistID: string, Taskid: string, title: string) => void,
    task: TaskType
}

export const Task: FC<TaskPropsType> = React.memo((props) => {

    const onClickRemoveTask = () => props.removeTasks(props.todolistID, props.task.id);
    const changeTitle = useCallback((title: string) => {
        props.onChangeTitle(props.todolistID, props.task.id, title);
    },[props.onChangeTitle,props.todolistID, props.task.id])

    return (
        <div key={props.task.id} className={props.task.isDone ? 'isDone' : ''}>
            <Checkbox
                color={'primary'}
                checked={props.task.isDone}
                onChange={(e) => props.changeStatus(props.todolistID, props.task.id, e.currentTarget.checked)}
            />
            <EditableSpan title={props.task.title} callback={changeTitle}/>
            <IconButton onClick={onClickRemoveTask}>
                <Delete />
            </IconButton>
        </div>
    );
});



