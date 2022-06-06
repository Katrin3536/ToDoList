import React, {useCallback, useEffect} from 'react';
import ToDoListHeader from './ToDoListHeader';
import {TaskList} from './TaskList';
import AddItemForm from './components/AddItemForm';
import Button from '@mui/material/Button';
import {FilterValuesType} from './state/todolist-reducer';
import {TaskStatuses, TaskType} from './api/todolist-api';
import {fetchTasksTC} from './state/tasks-reducer';
import { useDispatch } from 'react-redux';

type ToDoListPropsType = {
    todolistID: string
    titleEL: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    removeTasks: (todolistID: string, Taskid: string) => void,
    addTask: (todolistID: string, title: string) => void,
    changeFilter: (todolistID: string, filter: FilterValuesType) => void,
    changeStatus: (todolistID: string, id: string, status: TaskStatuses) => void
    removeTodolist: (todolistID: string) => void
    onChangeTitle: (todolistID: string, Taskid: string, title: string) => void
    editTitleTodolist: (todolistID: string, title: string) => void
}

const ToDoList: React.FC<ToDoListPropsType> = ({
                                                   todolistID,
                                                   titleEL,
                                                   filter,
                                                   tasks,
                                                   removeTasks,
                                                   addTask,
                                                   changeFilter,
                                                   ...restProps
                                               }) => {

    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(todolistID))
    },[])

    const addItem = useCallback((title: string) => {
        addTask(todolistID, title);
    }, [addTask, todolistID]);

    let taskForToDoList;
    switch (filter) {
        case 'Active':
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.New);
            break;
        case 'Completed':
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed);
            break;
        default:
            taskForToDoList = tasks;
    }

    return (
        <div>
            <ToDoListHeader
                title={titleEL}
                todolistID={todolistID}
                removeTodolist={restProps.removeTodolist}
                editTitleTodolist={restProps.editTitleTodolist}

            />

            <AddItemForm callback={addItem}/>

            <TaskList
                todolistID={todolistID}
                tasks={taskForToDoList}
                removeTasks={removeTasks}
                changeStatus={restProps.changeStatus}
                onChangeTitle={restProps.onChangeTitle}
            />

            <div>
                <Button
                    variant={filter === 'All' ? 'contained' : 'text'}
                    onClick={useCallback(() => changeFilter(todolistID, 'All'), [changeFilter, todolistID])}
                    color={'secondary'}
                    size={'small'}>
                    All
                </Button>
                <Button
                    variant={filter === 'Active' ? 'contained' : 'text'}
                    onClick={useCallback(() => changeFilter(todolistID, 'Active'), [changeFilter, todolistID])}
                    color={'error'}
                    size={'small'}>
                    Active
                </Button>
                <Button
                    variant={filter === 'Completed' ? 'contained' : 'text'}
                    onClick={useCallback(() => changeFilter(todolistID, 'Completed'), [changeFilter, todolistID])}
                    color={'success'}
                    size={'small'}>
                    Completed
                </Button>
            </div>
        </div>
    );
};

export default ToDoList;