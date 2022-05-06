import React from 'react';
import {TaskType} from './AppWithRedux';
import EditableSpan from './components/EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type TaskListPropsType = {
    todolistID: string,
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, Taskid: string) => void,
    changeStatus: (todolistID: string, id: string, newIsDone: boolean) => void,
    onChangeTitle: (todolistID: string, Taskid: string, title: string) => void
}

// const TaskList : React.FC<TaskListPropsType> = (props ) -второй вариант передачи пропсов
const TaskList: React.FC<TaskListPropsType> = (props) => {
    // const tasks = props.tasks - использование деструктуризации, вместо пропс.таскс использовать таскс.

    const tasksJSElements = props.tasks.map(t => {
        const onClickRemoveTask = () => props.removeTasks(props.todolistID, t.id);
        const changeTitle = (title: string) => {
            props.onChangeTitle(props.todolistID, t.id, title);
        };
        return (
            <div key={t.id} className={t.isDone ? 'isDone' : ''}>
                <Checkbox
                    color={'primary'}
                    checked={t.isDone}
                    onChange={(e) => props.changeStatus(props.todolistID, t.id, e.currentTarget.checked)}
                />
                <EditableSpan title={t.title} callback={changeTitle}/>
                <IconButton onClick={onClickRemoveTask}>
                    <Delete />
                </IconButton>
                {/*<button onClick={onClickRemoveTask}>X</button>*/}
            </div>
        );
    });
    return (
        <div>
            {tasksJSElements}
        </div>
    );
};
export default TaskList;