import React, {useCallback, useEffect} from 'react';
import './App.css';
import ToDoList from './ToDoList';
import AddItemForm from './components/AddItemForm';
import {AppBar, Container, Grid, Paper, Toolbar} from '@mui/material';
import {Button, IconButton, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTodolistAC, changeTitleTodolistAC, filterChangeTodolistAC, FilterValuesType, removeTodolistAC, TodolistDomainType} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {TaskStatuses, TaskType, todolistAPI} from './api/todolist-api';

export type TodolistTaskType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TodolistTaskType>(state => state.tasks);

    // useEffect(()=>{
    //     todolistAPI.getTodolist()
    //         .then(res=>res.data)
    // },[])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
        //     setTodolists(todolists.filter(el => el.id !== todolistID));
        //     delete tasks[todolistID];
    },[]);
    const removeTasks = useCallback((todolistID: string, Taskid: string) => {
        dispatch(removeTaskAC(todolistID, Taskid))
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== Taskid)});
    },[]);

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
        // setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});todolistID
    },[]);

    const changeFilter = useCallback((todolistID: string, filter: FilterValuesType) => {
        dispatch(filterChangeTodolistAC(todolistID, filter))
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter} : el));
    },[]);

    const changeStatus = useCallback((todolistID: string, id: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todolistID, id, status))
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === id ? {...el, isDone: newIsDone} : el)});
    },[]);

    const addNewTodolist = useCallback((title: string) => {
        // let newID = v1();
        // let newTodolist: TodolistsType = {id: newID, title, filter: 'All'};
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({...tasks, [newID]: []});
        dispatch(addTodolistAC(title))
    }, []);

    const onChangeTitle = useCallback((todolistID: string, Taskid: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID,Taskid, title))
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === Taskid ? {...el, title} : el)});
    },[]);

    const editTitleTodolist = useCallback((todolistID: string, title: string) => {
        dispatch(changeTitleTodolistAC(todolistID, title))
        // setTodolists(todolists.map(t => t.id === todolistID ? {...t, title} : t));
    },[]);

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
