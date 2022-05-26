import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import EditableSpan from './EditableSpan';

export default {
    title: 'Components/EditableSpan',
    component: EditableSpan,
    args: {
        removeTasks: action('task removed'),
        changeStatus: action('changed task status'),
        onChangeTitle: action('change task title'),
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    title: 'REACT',
    callback: action('span was changed')
};
