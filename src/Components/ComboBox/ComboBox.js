import React, {useEffect, useState} from 'react';

import "./combo-box.css";

export const useComboBoxValue = (init) => {
    const [choice, setChoice] = useState(init);

    return [choice, setChoice];
}

const ComboBox = ({
    buttonClassName,
    placeholder,
    optionClassName,
    optionList,
    valueState = undefined,
    disabled = false,
    id = ""
}) => {

    const comboBoxValueState = useComboBoxValue(undefined);
    const [choice, setChoice] = valueState === undefined ? comboBoxValueState : valueState;
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
        setActive(!isActive)
    }

    return (
        <button
            className={`combo-box ${(!choice && "initial-state")} ${isActive && "active"} ${buttonClassName}`}
            onClick={evt => {
                evt.preventDefault();
                handleClick();
            }}
            onBlur={() => { setActive(false) }}
            id={id}
            disabled={disabled}
        >
            <div className='button-text'>{choice ? optionList[choice] : placeholder}</div>
            <div><i className='fa fa-chevron-down combo-chevron'></i></div>
            <div className='dropdown-positioner'>
                {
                    !disabled &&
                    <ul className={`combo-dropdown ${isActive && "active"} ${optionClassName}`}>
                        {
                            Object.keys(optionList).map((key) => {
                                return (
                                    <li key={key} onClick={() => { setChoice(key) }}>
                                        {optionList[key]}
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        </button>
    )
}

export default ComboBox