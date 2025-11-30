import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import CustomJumbotron from '../../../../components/CustomJumbotron/CustomJumbotron'
import apis from '../../../../api/axiosApi'
import '../JobList.css'

const SingleCompany = props => {
  const apply = () => {
    apis.applyToJob({
      url: `/api/job/applytojob`,
      headers: { 'jwt': sessionStorage.getItem('jwt') },
      body: {
        jobId: props.singleCompany.jobs[0]._id,
        userId: props.userId,
        applicantEmail: props.user.email,
      }
    })
      .then(res => {
        props.getSingleCompany(props.singleCompany._id, props.singleCompany.jobs[0]._id)
      })
      .catch(err => {
        console.error(err)
        if (err.response.status >= 400) {
          if (err.response.status === 401) {
            return location.replace('/login')
          }
          return location.replace('/err')
        }
      })
  }

  const unapply = () => {
    apis.unapplyJob({
      url: `/api/job/unapplyjob`,
      headers: { 'jwt': sessionStorage.getItem('jwt') },
      body: { jobId: props.singleCompany.jobs[0]._id, userId: props.userId }
    })
      .then(res => {
        props.getSingleCompany(props.singleCompany._id, props.singleCompany.jobs[0]._id)
      })
      .catch(err => {
        console.error(err)
        if (err.response.status >= 400) {
          if (err.response.status === 401) {
            return location.replace('/login')
          }
          return location.replace('/err')
        }
      })
  }

  return (
    <div id={`${props.showSingleCompanyMobile ? "SingleCompanyMobileOverlay" : ""}`} onClick={() => props.setShowSingleCompanyMobile(false)}>
      <div className={`SingleCompany ${props.showSingleCompanyMobile ? "showSingleCompanyMobile" : ""} border-bottom scroll`} onMouseLeave={() => props.setShowSingleCompanyMobile(false)} onClick={() => props.setShowSingleCompanyMobile(false)}>
        {(props.singleCompany)
          ? (<>
            <Row className="g-0">
              <div className="SingleCompany-default-header display-6  d-flex justify-content-between ps-3">
                <span className={props.jobTitleAnime ? "SingleCompany-jobTitle" : ""}>{props.singleCompany.jobs[0].title}</span>
                {(props.singleCompany.userId === props.userId) ? (<span className="fs-6 text-secondary pe-2 align-self-center">Owner</span>) :
                  (props.singleCompany.jobs[0].applicants.some((appl, i) => appl.applicantEmail === props.user.email))
                    ?
                    (<div className="d-flex align-items-center">
                      <span className="fs-6 text-info pe-2 align-self-center">Applied <i className="fa fa-check"></i></span>
                      <Button variant="warning" className="fs-6 pe-2 text-secondary" onClick={unapply}>Un-Apply <i className="fa fa-times-circle"></i></Button>
                    </div>)
                    : (<Button variant="outline-success" className="justify-self-end" onClick={apply}><i className="fa fa-envelope-open-text"></i> Apply</Button>)
                }
              </div>
              <Col xs={12} md={6} className="border-end">
                <div >
                  <h4 className="text-decoration-underline SingleCompany-h4">Job-Type</h4>
                  {props.singleCompany.jobs[0].jobType} Time
                </div>
                <div>
                  <h4 className="text-decoration-underline SingleCompany-h4">Industry</h4>
                  {props.singleCompany.jobs[0].industry}
                </div>
                <div>
                  <h4 className="text-decoration-underline SingleCompany-h4">Benefits</h4>
                  <ul>
                    {Object.keys(props.singleCompany.benefits).map((benefit, idx) => {
                      return props.singleCompany.benefits[benefit] ? <li key={idx}>{benefit.replace("_", " ").toUpperCase()}: <i className="fa fa-check text-success"></i></li> : <li key={idx}>{benefit.replace("_", " ")}: <i className="fa fa-times text-warning"></i></li>
                    })}
                  </ul>
                </div>
              </Col>
              <Col xs={12} md={6} className="flex-column ps-3">
                <div className="">
                  <h4 className="text-decoration-underline SingleCompany-h4">Job Description</h4>
                  {props.singleCompany.jobs[0].description}
                </div>
                <div>
                  <h4 className="text-decoration-underline SingleCompany-h4">Required Skills</h4>
                  <ul>
                    {props.singleCompany.jobs[0].requiredSkills.map((skill, idx) => <li key={idx}>{skill}</li>)}
                  </ul>
                </div>
              </Col>
            </Row>

            <Row className="g-0">
              <h3 className="SingleCompany-default-header ps-3">
                Company Info
              </h3>

              <div>
                <h4 className="text-decoration-underline SingleCompany-h4">Company Name</h4>
                {props.singleCompany.companyName}
              </div>
              <div>
                <h4 className="text-decoration-underline SingleCompany-h4">Address</h4>
                {props.singleCompany.address.streetAddress}<br></br> {props.singleCompany.address.city}, {props.singleCompany.address.stateAbbr} {props.singleCompany.address.zipCode}
              </div>
              <div>
                <h4 className="text-decoration-underline SingleCompany-h4">Company Description</h4>
                {props.singleCompany.description}
              </div>

              <div>
                <h4 className="text-decoration-underline SingleCompany-h4">Number of Employees</h4>
                {props.singleCompany.employeeNumber}
              </div>

            </Row>

          </>)
          :
          (<CustomJumbotron
            bgImage="#"
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="right"
            height="100vh"
            text=" &#10094; &#10094; &#10094; Choose a Job to View"
            customJumbotronCss="SingleCompany-CustomJumbotron-1 g-0"
          />)
        }
      </div>

    </div>
  )
}

export default SingleCompany
