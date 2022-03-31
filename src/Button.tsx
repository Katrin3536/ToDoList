import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void,
    btnClass?: string,
}
const Button: React.FC<ButtonPropsType> = (props) => {
    return (
        <button className={props.btnClass} onClick={props.onClickHandler}>{props.title}</button>
    );
};

export default Button;