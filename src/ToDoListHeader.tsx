import React from 'react';

type ToDoListHeaderPropsType = {
    todolistID:string,
    removeTodolist: (todolistID: string) => void
    title: string
}
const ToDoListHeader: React.FC<ToDoListHeaderPropsType> = (props) => {
    const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistID)
    }

    return (
        <h3>
            {props.title}
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
    );
};

export default ToDoListHeader;