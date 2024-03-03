import React from 'react'
import "./accent-button.css"

const AccentButton = ({
    text = "",
    onClick = () => {},
    className = "",
    disabled = false
}) => {
  return (
    <button className={'accent-button ' + className} onClick={onClick} disabled = {disabled}>
        {text}
    </button>
  )
}

export default AccentButton