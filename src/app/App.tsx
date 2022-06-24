import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/icons-material/Menu';
import {DomainTaskType} from '../api/todolists-api';
import {TodolistsList} from '../features/todolists/TodolistsList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Login} from '../features/login/Login';
import {initializeAppTC} from './app-reducer';
import {CircularProgress} from '@mui/material';
import { logoutTC } from '../features/login/auth-reducer';

export type TodolistTaskType = {
    [key: string]: Array<DomainTaskType>
}

function App() {
    const dispatch = useDispatch();
    const status = useSelector<AppRootStateType, string>(state => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(initializeAppTC());
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
                    {isLoggedIn && <Button onClick={()=>dispatch(logoutTC())} color="inherit">Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed style={{padding: '20px'}}>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404:PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}


export default App;
