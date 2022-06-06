import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddItemForm from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Components/AddItemForm',
    component: AddItemForm,
    argTypes: {
        callback: { description: 'callback' },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    callback: action('Button inside form clicked')
};
