import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanType = {
    title: string
    callback: (title: string) => void
}

const EditableSpan = (props: EditableSpanType) => {
    let [newTitle, setNewTitle] = useState<string>(props.title);
    let [editMode, setEditMode] = useState<boolean>(false);

    const changeSpan = () => {
        setEditMode(true);
    };
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };
    const offChangeSpan = () => {
        setEditMode(false);
        props.callback(newTitle);
    };
    return (editMode
            ? <TextField
                id="outlined-name"
                label="Value"
                value={newTitle}
                onChange={onChangeInput}
                onBlur={offChangeSpan}
            />
            : <span onDoubleClick={changeSpan}>{props.title}</span>
    );
};

export default EditableSpan;

