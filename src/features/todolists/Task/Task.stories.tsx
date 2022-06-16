import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from '../../../api/todolists-api';

export default {
    title: 'Components/Task',
    component: Task,
    args: {
        removeTasks: action('task removed'),
        changeStatus: action('changed task status'),
        onChangeTitle: action('change task title'),
    },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskExampleIsDone = Template.bind({});
TaskExampleIsDone.args = {
    todolistID: 'todolistID1',
    task: {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        addedDate: '',
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        order: 0,
        deadline: '',
        priority: TaskPriorities.Low,
        entityStatus: 'idle'
    },
};

export const TaskExampleISNotDone = Template.bind({});
TaskExampleISNotDone.args = {
    todolistID: 'todolistID2',
    task: {
        id: '2',
        title: 'HTML',
        status: TaskStatuses.Completed,
        addedDate: '',
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        order: 0,
        deadline: '',
        priority: TaskPriorities.Low,
        entityStatus: 'idle'
    },
};