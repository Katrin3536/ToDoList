import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {
    addTodolistTC,
    changeFilterTodolistTC, changeTitleTodolistTC,
    fetchTodosThunkTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolist-reducer';
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolist-api';
import {Grid, Paper} from '@mui/material';
import AddItemForm from '../../components/AddItemsForm/AddItemForm';
import ToDoList from './ToDoList';
import {TodolistTaskType} from '../../app/App';

export const TodolistsList:React.FC = (props) => {
    let dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TodolistTaskType>(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTodosThunkTC());
    }, [dispatch]);

    const removeTodolist = useCallback((todolistID: string) => {
        const thunk = removeTodolistTC(todolistID);
        dispatch(thunk);
        //     setTodolists(todolists.filter(el => el.id !== todolistID));
        //     delete tasks[todolistID];
    }, [dispatch]);
    const removeTasks = useCallback((todolistID: string, Taskid: string) => {
        const thunk = removeTaskTC(todolistID, Taskid);
        dispatch(thunk);
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== Taskid)});
    }, [dispatch]);

    const addTask = useCallback((todolistID: string, title: string) => {
        const thunk = addTaskTC(todolistID, title);
        dispatch(thunk);
        // setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});todolistID
    }, [dispatch]);

    const changeFilter = useCallback((todolistID: string, filter: FilterValuesType) => {
        dispatch(changeFilterTodolistTC(todolistID, filter));
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter} : el));
    }, [dispatch]);

    const changeStatus = useCallback((todolistID: string, id: string, status: TaskStatuses) => {
        dispatch(updateTaskStatusTC(todolistID, id, status));
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === id ? {...el, isDone: newIsDone} : el)});
    }, [dispatch]);

    const addNewTodolist = useCallback((title: string) => {
        // let newID = v1();
        // let newTodolist: TodolistsType = {id: newID, title, filter: 'All'};
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({...tasks, [newID]: []});
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    const onChangeTitle = useCallback((todolistID: string, Taskid: string, title: string) => {
        dispatch(updateTaskTitleTC(todolistID, Taskid, title));
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === Taskid ? {...el, title} : el)});
    }, [dispatch]);

    const editTitleTodolist = useCallback((todolistID: string, title: string) => {
        dispatch(changeTitleTodolistTC(todolistID, title));
        // setTodolists(todolists.map(t => t.id === todolistID ? {...t, title} : t));
    }, [dispatch]);

    return <>
        <Grid container> <Paper style={{padding: '10px'}} elevation={3}><AddItemForm callback={addNewTodolist}/></Paper></Grid>
        <Grid container spacing={3}>{todolists.map(el => {
            return <Grid item key={el.id}>
                <Paper style={{padding: '10px'}} elevation={3}>
                    <ToDoList
                        key={el.id}
                        todolistID={el.id}
                        filter={el.filter}
                        titleEL={el.title}
                        tasks={tasks[el.id]}
                        removeTasks={removeTasks}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        onChangeTitle={onChangeTitle}
                        editTitleTodolist={editTitleTodolist}
                    />
                </Paper>
            </Grid>;
        })}</Grid>
    </>
}
