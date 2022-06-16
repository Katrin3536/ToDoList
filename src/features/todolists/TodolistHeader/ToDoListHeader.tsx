import React, {useCallback} from 'react';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {RequestStatusType} from '../../../app/app-reducer';


type ToDoListHeaderPropsType = {
    todolistID: string,
    removeTodolist: (todolistID: string) => void
    title: string
    editTitleTodolist: (todolistID: string, title: string) => void
    entityStatus: RequestStatusType
}

const ToDoListHeader: React.FC<ToDoListHeaderPropsType> = (props) => {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID);
    };

    const editTitle = useCallback((title: string) => {
        props.editTitleTodolist(props.todolistID, title);
    }, [props.todolistID,props.editTitleTodolist]);
    return (
        <h3>
            <EditableSpan title={props.title} callback={editTitle} entityStatus={props.entityStatus}/>
            <IconButton onClick={removeTodolistHandler} disabled={props.entityStatus==='loading'}>
                <Delete/>
            </IconButton>
        </h3>
    );
};

export default ToDoListHeader;