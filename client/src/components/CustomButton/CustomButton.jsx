import React from 'react'
import './CustomButton.css'
const CustomButton = (props) =>
  <button className={props.customClasses} onClick={props.onClick} disabled={props.disabled}>
    {props.text}
    {props.children}
  </button>

export default CustomButton;
