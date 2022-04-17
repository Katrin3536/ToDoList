import React from 'react';
import {FilterValuesType, TaskType} from './App';
import ToDoListHeader from './ToDoListHeader';
import TaskList from './TaskList';
import AddItemForm from './components/AddItemForm';
import Button from '@mui/material/Button';

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


    const addItem = (title: string) => {
        addTask(todolistID, title);
    };


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
                tasks={tasks}
                removeTasks={removeTasks}
                changeStatus={restProps.changeStatus}
                onChangeTitle={restProps.onChangeTitle}
            />

            <div>
                <Button
                    variant={filter === 'All' ? 'contained' : 'text'}
                    onClick={() => changeFilter(todolistID, 'All')}
                    color={'secondary'}
                    size={'small'}>
                    All
                </Button>
                <Button
                    variant={filter === 'Active' ? 'contained' : 'text'}
                    onClick={() => changeFilter(todolistID, 'Active')}
                    color={'error'}
                    size={'small'}>
                    Active
                </Button>
                <Button
                    variant={filter === 'Completed' ? 'contained' : 'text'}
                    onClick={() => changeFilter(todolistID, 'Completed')}
                    color={'success'}
                    size={'small'}>
                    Completed
                </Button>

            </div>
        </div>
    );
};

export default ToDoList;