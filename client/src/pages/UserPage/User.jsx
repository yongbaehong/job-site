import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

import apis from './../../api/axiosApi'
// Components
import PageTemplate from './../../components/PageTemplate/PageTemplate'
import CustomSideNav from './../../components/SideNav/CustomSideNav'
import CustomJumbotron from './../../components/CustomJumbotron/CustomJumbotron'
// USER components
import Dashboard from './Dashboard/Dashboard'
import JobList from './JobList/JobList'
import Resume from './Resume/Resume'
import BookmarkJobs from './BookmarkJobs/BookmarkJobs'
// EMPLOYER components
import Company from './Company/Company'
import AddJobs from './Company/AddJobs/AddJobs'
import OpenPositionsClass from './Company/OpenPositions/OpenPositionsClass'
import CustomButton from '../../components/CustomButton/CustomButton';
import './User.css'

const User = ({ history }) => {

  const [user, setUser] = useState([])
  const [error, setError] = useState("")
  const showXcomponentHandler = xcomponent => setXcomp(xcomponent)
  const [xComp, setXcomp] = useState('dashboard')
  
  useEffect(() => {
    apis.getUser({
      url: `/api/user`,
      headers: { 'jwt': sessionStorage.getItem('jwt') }
    })
      .then(res => {
        setUser(res.data[0])
        window.sessionStorage.setItem('user', res.data[0].email)
      })
      .catch(err => {
        console.log(err.response.status)
        if (err.response.status >= 400) {
          setError(`${err.response.status} Error : ${err.response.statusText}`)
        }
      })
  }, [])

  // Scroll to top of <singleCompany/> when selecting/viewing for better effect
  const scroll = () => {
    document.querySelector('.showSingleCompanyMobile').scrollTo(0, 0)
    document.querySelector('.scroll').scrollIntoViewIfNeeded()
  }
  // use an object to display a specific component
  const Xcomponent = {
    add_job: <AddJobs company={user.companyId} setUser={setUser} setXcomp={setXcomp} />,
    open_positions: <OpenPositionsClass company={user.companyId} userId={user._id} setUser={setUser} setXcomp={setXcomp}/>,
    company: <Company userId={user._id} hasCompany={user.hasCompany} user={user} setUser={setUser} company={user.companyId} />,
    job_list: <JobList userId={user._id} user={user} setUser={setUser} setError={setError} scroll={scroll} />,
    resume: <Resume resume={user.resume} setUser={setUser} user={user} setError={setError}/>,
    bookmarked_jobs: <BookmarkJobs userId={user._id} user={user} setUser={setUser} scroll={scroll} history={history}/>,
    dashboard: <Dashboard user={user} setXcomp={setXcomp} />
  }

  return (
    // Check if User exists
    user.email
      ? (
        <PageTemplate user={user.email} xComp={xComp}>
          <CustomSideNav
            showXcomponentHandler={showXcomponentHandler}
            hasCompany={user.hasCompany}
            user={user}
            history={history}
          />
          <div style={{ paddingTop: '50px' }} className="scroll">
            {xComp ? Xcomponent[xComp] : Xcomponent[xComp]}
          </div>
        </PageTemplate>
      )
      : ( //If there is no 'user' on refresh, show default
        <PageTemplate>
          <CustomJumbotron
            bgImage="./image/kostiantyn-li-Fi_nhg5itCw-unsplash.jpg"
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="center center"
            height="100vh"
            text={error}
            customJumbotronCss="User-CustomJumbotron-Error"
          >
            <Row>
              <Col xs={12} sm={12} md={6} >
                <CustomButton
                  customClasses="Button Button--green"
                  text="Login"
                  onClick={() => history.replace({ pathname: '/login' })}
                />
              </Col>
              <Col xs={12} sm={12} md={6} >
                <CustomButton
                  customClasses="Button Button--success"
                  text="signup"
                  onClick={() => history.replace({ pathname: '/signup' })}
                />
              </Col>
            </Row>
          </CustomJumbotron>
        </PageTemplate>
      )
  )
}

export default User