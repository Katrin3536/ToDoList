import React, {useCallback} from 'react';
import ToDoListHeader from './TodolistHeader/ToDoListHeader';
import {TasksList} from './TasksList/TasksList';
import AddItemForm from '../../components/AddItemsForm/AddItemForm';
import Button from '@mui/material/Button';
import {FilterValuesType} from './todolist-reducer';
import {DomainTaskType, TaskStatuses} from '../../api/todolists-api';
import {RequestStatusType} from '../../app/app-reducer';

type ToDoListPropsType = {
    todolistID: string
    titleEL: string,
    filter: FilterValuesType,
    tasks: Array<DomainTaskType>,
    removeTasks: (todolistID: string, Taskid: string) => void,
    addTask: (todolistID: string, title: string) => void,
    changeFilter: (todolistID: string, filter: FilterValuesType) => void,
    changeStatus: (todolistID: string, id: string, status: TaskStatuses) => void
    removeTodolist: (todolistID: string) => void
    onChangeTitle: (todolistID: string, Taskid: string, title: string) => void
    editTitleTodolist: (todolistID: string, title: string) => void
    entityStatus: RequestStatusType
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

    // let dispatch = useDispatch()
    //
    // useEffect(()=>{
    //     dispatch(fetchTasksTC(todolistID))
    // },[dispatch, todolistID])

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
                entityStatus={restProps.entityStatus}

            />

            <AddItemForm callback={addItem} entityStatus={restProps.entityStatus}/>

            <TasksList
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