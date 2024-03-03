import React, {useEffect, useState} from 'react';

import "./counter.css";
import PlainButton from '../PlainButton/PlainButton';

export const useCounterValue = init => {
    const [value, setValue] = useState(init)

    return [value, setValue]
}

const Counter = ({
    valueState = undefined,
    min = 0,
    max = 100,
    id = "",
    className = "",
    disabled = false
}) => {

    const counterValueState = useCounterValue(0);
    const [value, setValue] = valueState === undefined ? counterValueState : valueState;
    const [inputValue, setInputValue] = useState(value);
    
    const getTrimmedValue = i => Math.min(max, Math.max(min, i));
    const increment = () => setValue(getTrimmedValue(value + 1));
    const decrement = () => setValue(getTrimmedValue(value - 1));

    const handleImplicitChanges = (evt) => {
        const val = evt.target.value;
        let intVal = 0;
        try {
            intVal = parseInt(val);
        } catch (e) {
            console.log("Invalid value entered...")
        }
        if (!isNaN(intVal)) 
            setValue(getTrimmedValue(intVal));
        setInputValue(value);
    }

    useEffect(() => {
        setInputValue(value);
    }, [value])

    return (
        <div className={`counter ${className}`}>
            <input type='text' 
                value={inputValue} 
                onChange={(evt) => {setInputValue(evt.target.value)}} 
                onBlur={handleImplicitChanges}
                onFocus={(evt) => {evt.target.select()}}
                id={id}
                disabled={disabled}
            />
            <PlainButton
                className='inc'
                text = {
                    <>
                        <i className='fa fa-chevron-up'></i>
                    </>
                }
                onClick={increment}
                disabled={value === max || disabled}
            />
            <PlainButton
                className='dec'
                text = {
                    <>
                        <i className='fa fa-chevron-down'></i>
                    </>
                }
                onClick={decrement}
                disabled={value === min || disabled}
            />
        </div>
    )
}

export default Counter