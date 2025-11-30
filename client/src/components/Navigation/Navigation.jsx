import React from 'react'
import { Link } from 'react-router-dom'
import CustomButton from '../CustomButton/CustomButton'
import './Navigation.css'

const Navigation = props => {
  let dashboardTxt = props.xComp
  // remove underscore from key text, and replace with a space
  let newTxt = dashboardTxt ? dashboardTxt.replace('_', ' ') : ""

  return (
    <>
      <div className="Navigation-bar w-100">
        <ul className="Navigation-items">
          {newTxt ? <li className="dashboard">{newTxt}</li> : null}
          <li className="me-5"><Link to={props.user? "#": "/"} id="logo" style={{cursor: props.user? "default":"pointer"}}>Métier</Link></li>
          {!props.user ? <li className="pe-3"><CustomButton customClasses="Button Button--green"><Link to="/login" className="text-decoration-none text-white">Login</Link></CustomButton></li> : null}
        </ul>
      </div>
    </>
  )
}

export default Navigation