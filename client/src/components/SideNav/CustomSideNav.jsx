import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import CustomSideNavLi from './CustomSideNavLi/CustomSideNavLi'
import CustomButton from '../CustomButton/CustomButton'
import './CustomSideNav.css'

const CustomSideNav = ({ user, hasCompany, showXcomponentHandler, history }) => {
  // removing email host string in SideNav
  const username = user.email.slice(0, user.email.indexOf("@"))
  const [showCustomNav, setShowCustomNav] = useState(false)
  const [employeeNav, setEmployeeNav] = useState(false)

  const onXcomponentHandler = (liRef) => {
    showXcomponentHandler(liRef)
    setShowCustomNav(false)
  }

  const closeShowCustomNav = () => setShowCustomNav(false)
  const openShowCustomNav = () => setShowCustomNav(!showCustomNav)
  const switchUserOrEmployeeNav = () => setEmployeeNav(!employeeNav)

  return (
    <>
      <button className="CustomSideNav-burger d-flex align-items-center justify-content-center" onClick={openShowCustomNav} >
        <i className="fa fa-th-large"></i>
      </button>
      <div className={showCustomNav ? "CustomSideNav-mobile-overlay-open" : "hide"} onClick={closeShowCustomNav}></div>
      <aside className={showCustomNav ? "CustomSideNav" : "CustomSideNav hide"} onMouseLeave={closeShowCustomNav}>

        <ul className="list-unstyled CustomSideNav-ul flex-column">
          <div className="text-center text-success my-2 align-items-start"><span className="CustomSideNav-userEmail">{username}</span></div>
          <li className="d-flex justify-content-between align-items-center CustomSideNav-home-logout">
            <CustomButton
              customClasses="Button Button--warning Button-text-warning"
              text="Logout"
              onClick={() => {
                // remove jwt token to completely deny access to all routes
                sessionStorage.removeItem('jwt')
                history.replace({ pathname: '/' })
              }}
            />
          </li>
          <CustomSideNavLi
            onXcomponentHandler={onXcomponentHandler}
            xcompDisplay="dashboard"
            xcompText="Dashboard"
            faIcon="table"
          />
          {!employeeNav ?
            <>
              <li
                className="text-center bg-success text-white fs-3 d-flex justify-content-between align-items-center px-3 toggle"
                onClick={switchUserOrEmployeeNav}
                data-user-employee="Switch to Employer"
              >
                USER<i className="fa fa-toggle-off"></i>
              </li>
              <CustomSideNavLi
                onXcomponentHandler={onXcomponentHandler}
                xcompDisplay="job_list"
                xcompText="Job Listings"
                faIcon="list"
              />
              <CustomSideNavLi
                onXcomponentHandler={onXcomponentHandler}
                xcompDisplay="resume"
                xcompText="Resume"
                faIcon="id-card"
              />
              <CustomSideNavLi
                onXcomponentHandler={onXcomponentHandler}
                xcompDisplay="bookmarked_jobs"
                xcompText="Mark'd & Applied"
                faIcon="file-signature"
              />
            </> :
            <>
              <li
                className=" text-center bg-success text-white fs-3 d-flex justify-content-between align-items-center px-3 toggle"
                onClick={switchUserOrEmployeeNav}
                data-user-employee="Switch to User"
              >
                EMPLOYER<i className="fa fa-toggle-on"></i>
              </li>

              <CustomSideNavLi
                onXcomponentHandler={onXcomponentHandler}
                xcompDisplay="company"
                xcompText="Company Profile"
                faIcon="parking"
              />

              {(hasCompany)
                ? <>
                  <CustomSideNavLi
                    onXcomponentHandler={onXcomponentHandler}
                    xcompDisplay="add_job"
                    xcompText="Add Job"
                    faIcon="file-medical"
                  />
                  <CustomSideNavLi
                    onXcomponentHandler={onXcomponentHandler}
                    xcompDisplay="open_positions"
                    xcompText="Open Positions"
                    faIcon="folder-open"
                  >
                    <div className="badge rounded-pill bg-success ms-2">{user.companyId.jobs.length}</div>
                  </CustomSideNavLi>
                </>
                : <li className="text-center">must create company for other features</li>}
            </>
          }
        </ul>
      </aside>
    </>
  )
}

export default CustomSideNav