import React, {useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import ToDoListHeader from './ToDoListHeader';
import Button from './Button';
import TaskList from './TaskList';

type ToDoListPropsType = {
    todolistID: string
    titleEL: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    removeTasks: (todolistID: string, Taskid: string) => void,
    addTask: (todolistID: string, title: string) => void,
    changeFilter: (todolistID: string, filter: FilterValuesType) => void,
    changeStatus: (todolistID: string, id: string, newIsDone: boolean) => void
    removeTodolist: (todolistID: string) => void
}

const ToDoList: React.FC<ToDoListPropsType>=({todolistID,titleEL,filter,tasks,removeTasks,addTask,changeFilter, ...restProps})=> {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const addTasks = () => {
        const trimmed = title.trim();
        if (trimmed) {
            addTask(todolistID, trimmed);
        } else {
            setError(true);
        }
        setTitle('');
    };

    return (
        <div>
            <ToDoListHeader
                title={titleEL}
                todolistID={todolistID}
                removeTodolist={restProps.removeTodolist}

            />
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                        setError(false);
                    }}

                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addTasks();
                        }
                    }}/>
                <Button onClickHandler={addTasks} title={'+'}/>
                {error && <div className={'message-error'}>Title is required</div>}
            </div>
            <TaskList
                todolistID={todolistID}
                tasks={tasks}
                removeTasks={removeTasks}
                changeStatus={restProps.changeStatus}
            />

            <div>
                <Button btnClass={filter === 'All' ? 'btn-active' : ''}
                        onClickHandler={() => changeFilter(todolistID, 'All')} title={'All'}/>
                <Button btnClass={filter === 'Active' ? 'btn-active' : ''}
                        onClickHandler={() => changeFilter(todolistID, 'Active')} title={'Active'}/>
                <Button btnClass={filter === 'Completed' ? 'btn-active' : ''}
                        onClickHandler={() => changeFilter(todolistID, 'Completed')} title={'Completed'}/>

            </div>
        </div>
    );
}

export default ToDoList;