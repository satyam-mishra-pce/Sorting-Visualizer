import React from 'react'
import "./tinted-button.css"

const TintedButton = ({
    text = "",
    onClick = () => {},
    className = "",
    disabled = false
}) => {
  return (
    <button className={'tinted-button ' + className} onClick={onClick} disabled = {disabled}>
        {text}
    </button>
  )
}

export default TintedButton