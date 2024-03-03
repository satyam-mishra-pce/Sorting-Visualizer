import React from 'react'
import "./plain-button.css"

const PlainButton = ({
    text = "",
    onClick = () => {},
    className = "",
    disabled = false
}) => {
  return (
    <button className={'plain-button ' + className} onClick={onClick} disabled = {disabled}>
        {text}
    </button>
  )
}

export default PlainButton