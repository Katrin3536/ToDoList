import React from 'react';
import './App.css';
import AppBar  from '@mui/material/AppBar';
import Button  from '@mui/material/Button';
import Container  from '@mui/material/Container';
import IconButton  from '@mui/material/IconButton';
import LinearProgress  from '@mui/material/LinearProgress';
import Toolbar  from '@mui/material/Toolbar';
import Typography  from '@mui/material/Typography';
import Menu from '@mui/icons-material/Menu';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/todolists/TodolistsList';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';

export type TodolistTaskType = {
    [key: string]: Array<TaskType>
}

function App() {
    const status = useSelector<AppRootStateType, string>(state=>state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed style={{padding: '20px'}}>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
