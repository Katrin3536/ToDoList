import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/todolists/TodolistsList';

export type TodolistTaskType = {
    [key: string]: Array<TaskType>
}

function App() {
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
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
