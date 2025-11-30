import React from 'react'
import './CustomSideNavLi.css'

const CustomSideNavLi = props => {
  let { xcompText, faIcon, xcompDisplay, onXcomponentHandler } = props
  const displayComponent = () => onXcomponentHandler(xcompDisplay)
  return (
    <li
      className="CustomSideNav-li py-2 d-flex justify-content-between"
      onClick={displayComponent}
    >
      <i className={`fa fa-${faIcon} fs-2 CustomSideNav-i ms-1`}></i>
      <span className="me-5">{props.children}{xcompText}</span>
    </li>
  )
}

export default CustomSideNavLi;
