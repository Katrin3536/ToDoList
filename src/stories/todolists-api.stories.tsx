import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.createTodolist('New Todolist')
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'a3bcd2e4-b0cf-4a0a-9ec2-c53689720b45';
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            });

    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '1dc2dc15-2263-4fac-9106-6a7b346150b7';
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTask = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            });
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTask}>get tasks</button>
        </div>
    </div>;
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const deleteTasks = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            });
    };
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTasks}>delete task</button>
        </div>
    </div>;
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');

    const createTasks = () => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            });
    };
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskTitle'} value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTasks}>create task</button>
        </div>
    </div>;
};

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('title1');
    const [description, setDescription] = useState<string>('description1');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');

    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const createTask = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            deadline: '',
            startDate: '',
            priority: priority,
            status: status,
            title: title,
            description: '',
        })
            .then((res) => {
                setState(res.data);
            });
    };
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={todolistId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'Task title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input placeholder={'Description'} value={description}
                   onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input placeholder={'Status'} value={status} onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input placeholder={'Priority'} value={priority} onChange={(e) => setPriority(+e.currentTarget.value)}/>
            <button onClick={createTask}>update task</button>
        </div>
    </div>;
};

