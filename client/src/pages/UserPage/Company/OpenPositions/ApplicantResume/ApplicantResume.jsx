import React from 'react'
import { Row, Col } from 'react-bootstrap'

import CustomButton from '../../../../../components/CustomButton/CustomButton'
import './ApplicantResume.css'

const ApplicantResume = ({ applicant, close, showResume }) => {
  return (
    <div className={`ApplicantResume-overlay ${showResume ? "ApplicantResume-show" : ""}`} onClick={close}>
      <div className={`ApplicantResume`} onMouseLeave={close}>
        <h1 className="text-center">{applicant ? applicant.applicantEmail : ""}'s Resume</h1>
        {applicant ?
          (<div>
            <Row className="gy-3">
              <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} className="">
                <h4 className="Resume-h4 text-decoration-underline">Experience</h4>
                <p className="Resume-experience fst-italic">{applicant.userId.resume.experience? applicant.userId.resume.experience: "Does not have any experience yet."}</p>
              </Col>
              <Col xs={12} sm={{ span: 5, offset: 1 }} md={{ span: 5, offset: 1 }} className="">
                <h4 className="Resume-h4 text-decoration-underline">Education</h4>
                <ol>{applicant.userId.resume.education.length ? applicant.userId.resume.education.map((ed, j) =>
                  <li key={j}>
                    {ed}
                  </li>) : "Nothing Listed"}</ol>

              </Col>
              <Col xs={12} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} className="">
                <h4 className="Resume-h4 text-decoration-underline">Skills</h4>
                <ol>{applicant.userId.resume.skills.length ? applicant.userId.resume.skills.map((skill, i) =>
                  <li key={i}>
                    {skill}
                  </li>) : "Nothing Listed"}</ol>
              </Col>
            </Row>
          </div>)
          :
          null
        }
        <div className="text-center">

        <CustomButton
          onClick={close}
          customClasses="Button Button--warning Button--warning--text"
          text="Close"
        />
        </div>
      </div>
    </div>
  )
}

export default ApplicantResume