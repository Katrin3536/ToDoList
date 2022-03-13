import React from 'react';
 type ButtonPropsType = {
     title: string
     onClickRemoveTask?:()=> void
 }
const Button = (props:ButtonPropsType) => {
    return (
        <button onClick={props.onClickRemoveTask}>{props.title}</button>
    );
};

export default Button;