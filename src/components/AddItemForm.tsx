import React, {useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type AddItemFormType = {
    callback: (title: string) => void,
}

const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const addTasks = () => {
        const trimmed = title.trim();
        if (trimmed) {
            props.callback(trimmed);
        } else {
            setError(true);
        }
        setTitle('');
    };

    return (
        <div>
            <TextField
                size={'small'}
                id="outlined-name"
                label="Value"
                onChange={(e) => {
                    setTitle(e.currentTarget.value);
                    setError(false);
                }}
                error={!!error}
                helperText={error}
                value={title}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        addTasks();
                    }
                }}
            />
            <IconButton onClick={addTasks} color={'primary'}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;