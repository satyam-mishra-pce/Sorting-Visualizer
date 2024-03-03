import React, { useState } from 'react';

import "./range-bar.css";

export const useRangeBarValue = init => {
  const [value, setValue] = useState(init)

  return [value, setValue]
}

const RangeBar = ({
    valueState = undefined,
    min = 0,
    max = 100,
    id = "",
    className = "",
    dangerThreshold = 70,
    dangerThresholdText = "",
    disabled = false,
    labelSuffix = ""
}) => {

    const rangeBarValueState = useRangeBarValue(0);
    const [value, setValue] = valueState === undefined ? rangeBarValueState : valueState;

    const handleChange = (evt) => {
      setValue(evt.target.value);
    }

    return (
      <div className={`range-bar ${className}`}>
        <div className='range-wrapper'>
          <input 
            id={id}
            type='range' 
            min={min} 
            max={max} 
            value={value} 
            onChange={handleChange} 
            style={{"--range-color" : (value > dangerThreshold) ? "#780000" : "#007957"}}
            disabled={disabled}
          />
          <div className='range-value' >
            <span className='value'>
              {value}
            </span>
            <span className='label-suffix'>
              {labelSuffix}
            </span>
          </div>
        </div>
        {
          value > dangerThreshold &&
          <div className='threshold-text'>
            {dangerThresholdText}
          </div>
        }
      </div>
    )
}


export default RangeBar;