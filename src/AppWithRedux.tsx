import React, {useCallback, useEffect} from 'react';
import './App.css';
import ToDoList from './ToDoList';
import AddItemForm from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {
    addTodolistTC,
    changeFilterTodolistTC,
    changeTitleTodolistTC,
    fetchTodosThunkTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './state/todolist-reducer';
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from './state/tasks-reducer';
import {TaskStatuses, TaskType} from './api/todolist-api';

export type TodolistTaskType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TodolistTaskType>(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTodosThunkTC());
    }, []);

    const removeTodolist = useCallback((todolistID: string) => {
        const thunk = removeTodolistTC(todolistID);
        dispatch(thunk);
        //     setTodolists(todolists.filter(el => el.id !== todolistID));
        //     delete tasks[todolistID];
    }, []);
    const removeTasks = useCallback((todolistID: string, Taskid: string) => {
        const thunk = removeTaskTC(todolistID, Taskid);
        dispatch(thunk);
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== Taskid)});
    }, []);

    const addTask = useCallback((todolistID: string, title: string) => {
        const thunk = addTaskTC(todolistID, title);
        dispatch(thunk);
        // setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});todolistID
    }, []);

    const changeFilter = useCallback((todolistID: string, filter: FilterValuesType) => {
        dispatch(changeFilterTodolistTC(todolistID, filter));
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter} : el));
    }, []);

    const changeStatus = useCallback((todolistID: string, id: string, status: TaskStatuses) => {
        dispatch(updateTaskStatusTC(todolistID, id, status));
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === id ? {...el, isDone: newIsDone} : el)});
    }, []);

    const addNewTodolist = useCallback((title: string) => {
        // let newID = v1();
        // let newTodolist: TodolistsType = {id: newID, title, filter: 'All'};
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({...tasks, [newID]: []});
        dispatch(addTodolistTC(title));
    }, []);

    const onChangeTitle = useCallback((todolistID: string, Taskid: string, title: string) => {
        dispatch(updateTaskTitleTC(todolistID, Taskid, title));
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === Taskid ? {...el, title} : el)});
    }, []);

    const editTitleTodolist = useCallback((todolistID: string, title: string) => {
        dispatch(changeTitleTodolistTC(todolistID, title));
        // setTodolists(todolists.map(t => t.id === todolistID ? {...t, title} : t));
    }, []);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{backgroundColor: 'green'}}>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding: '20px'}}>
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
            </Container>
        </div>
    );
}

export default AppWithRedux;
