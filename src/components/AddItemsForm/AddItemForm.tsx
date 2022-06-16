import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {AddBox} from '@mui/icons-material';
import {RequestStatusType} from '../../app/app-reducer';

type AddItemFormType = {
    callback: (title: string) => void,
    entityStatus?: RequestStatusType
}

const AddItemForm = React.memo((props: AddItemFormType) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean | null>(false);

    const addTasks = () => {
        const trimmed = title.trim();
        if (trimmed) {
            props.callback(trimmed);
        } else {
            setError(true);
        }
        setTitle('');
    };

    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addTasks();
        }
    };
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false);
    }

    return (
        <div>
            <TextField
                size={'small'}
                id="outlined-name"
                label="Value"
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
                value={title}
                onKeyPress={onKeyHandler}
                disabled={props.entityStatus==='loading'}

            />
            <IconButton onClick={addTasks} color={'primary'} disabled={props.entityStatus === 'loading'}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

export default AddItemForm;