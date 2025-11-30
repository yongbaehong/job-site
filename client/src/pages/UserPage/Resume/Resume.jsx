import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { timeYearMonthDay } from '../../../lib/calculateTime'
import EditResume from './EditResume'
import './Resume.css'

const Resume = props => {
  let { experience, education, skills } = props.resume
  return (
    <>
      <h4 className="Resume-h4 text-center">(Updated: {timeYearMonthDay(props.resume.update)})</h4>
      <EditResume
        setUser={props.setUser}
        experience={experience}
        education={education}
        skills={skills}
        setError={props.setError}
      />
      <h1 className="text-center display-2 border-bottom">{props.user.email}'s Resume</h1>
      <Row className="gy-3">
        <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} className="border-bottom">
          <h4 className="Resume-h4 text-decoration-underline">Experience</h4>
          <p className="Resume-experience fst-italic">{!experience ? "Edit your resume now~" : experience}</p>
        </Col>
        <Col xs={12} sm={{ span: 5, offset: 1 }} md={{ span: 5, offset: 1 }} className="border-end">
          <h4 className="Resume-h4 text-decoration-underline">Education</h4>
          <ol>{education.length ? education.map((edu, idx) => <li key={idx}>{edu}</li>) : "None listed"}</ol>

        </Col>
        <Col xs={12} sm={{ span: 5, offset: 1 }} md={{ span: 5, offset: 1 }} className="">
          <h4 className="Resume-h4 text-decoration-underline">Skills</h4>
          <ol>{skills.length ? skills.map((skill, idx) => <li key={idx}>{skill}</li>) : "None listed"}</ol>
        </Col>
      </Row>
    </>
  )
}

export default Resume;