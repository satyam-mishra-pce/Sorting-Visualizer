import React, { useState } from 'react'

import "./checkbox.css"

export const useChecked = (value) => {
    const [isChecked, setChecked] = useState(value);

    return [isChecked, setChecked]
}

const CheckBox = ({
    valueState = undefined,
    label = "",
    className = ""
}) => {

    // console.log(valueState);
    const checkedState = useChecked(false);
    const [isChecked, setChecked] = valueState === undefined ? checkedState : valueState;

    const handleClick = () => {
        setChecked(!isChecked);
    }
    return (
        <div className={`checkbox ${className}`} onClick={handleClick}>
            <div className='indicator'>
                {
                    isChecked &&
                    <i className='fa fa-check'></i>
                }
            </div>
            <div>{label}</div>
        </div>
    )
}

export default CheckBox