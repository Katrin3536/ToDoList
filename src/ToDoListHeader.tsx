import React, {useCallback} from 'react';
import EditableSpan from './components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {IconButton} from '@mui/material';


type ToDoListHeaderPropsType = {
    todolistID: string,
    removeTodolist: (todolistID: string) => void
    title: string
    editTitleTodolist: (todolistID: string, title: string) => void
}

const ToDoListHeader: React.FC<ToDoListHeaderPropsType> = (props) => {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID);
    };

    const editTitle = useCallback((title: string) => {
        props.editTitleTodolist(props.todolistID, title);
    }, [props.todolistID,props.editTitleTodolist ]);
    return (
        <h3>
            <EditableSpan title={props.title} callback={editTitle}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
    );
};

export default ToDoListHeader;