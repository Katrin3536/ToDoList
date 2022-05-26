import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

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
    task: {id: '1', title: 'CSS', isDone: true},
};

export const TaskExampleISNotDone = Template.bind({});
TaskExampleISNotDone.args = {
    todolistID: 'todolistID2',
    task: {id: '2', title: 'HTML', isDone: false},
};