import React, { useState, useRef } from 'react'
import { Row, Form, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import apis from '../../../../api/axiosApi'

const AddJobs = props => {
  // must use Refs with no <Form>, because <Form> is affected by skills Input field that also requires update
  const title = useRef(null)
  const jobType = useRef(null)
  const description = useRef(null)
  const industry = useRef(null)
  const skills = useRef(null)

  const [requiredSkills, setRequiredSkills] = useState([])

  // RESET the FORM and return to another component or show the new job added
  const addJobsSubmitHandler = (evt) => {
    evt.preventDefault()
    if (requiredSkills.length < 1) {
      return skills.current.focus()
    }
    const jobInfo = {
      title: title.current.value,
      jobType: jobType.current.value,
      description: description.current.value,
      industry: industry.current.value,
      requiredSkills,
      companyId: props.company._id
    }
    apis.addJobs({
      url: '/api/job',
      headers: { 'jwt': sessionStorage.getItem('jwt') },
      body: jobInfo
    })
      .then(res => {
        props.setUser(res.data)
        props.setXcomp('open_positions')
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
    <>
      <div className="text-center display-3">Add a Job</div>
      <Row>
        <Col sm={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} xl={{ span: 6, offset: 3 }}>
          <Form validated onSubmit={addJobsSubmitHandler}>
            {/* JOB Position */}
            <Form.Group className="mb-4">
              <Form.Label as="legend" className="text-success fw-bold text-decoration-underline">Title</Form.Label>
              <Form.Control ref={title} name="title" type="text" placeholder="CEO/CFO/Admin/Manager/Assistant" required />
            </Form.Group>

            {/* FULL/PART/INTERN - Time */}
            <Form.Group className="mb-4">
              <Form.Label as="legend" className="text-success fw-bold text-decoration-underline">Job Type</Form.Label>
              <Form.Control ref={jobType} as="select" name="jobType">
                <option defaultValue>Full</option>
                <option>Part</option>
                <option>Intern</option>
              </Form.Control>
            </Form.Group>

            {/* DESCRIPTION/Expectations OF JOB  */}
            <Form.Group className="d-flex flex-column mb-4">
              <Form.Label as="legend" className="text-success fw-bold text-decoration-underline">Job Description</Form.Label>
              <textarea ref={description} name="description" row="10" className="p-3 m-3" required></textarea>
            </Form.Group>

            {/* INDUSTRY TYPE */}
            <Form.Group className="mb-4">
              <Form.Label as="legend" className="text-success fw-bold text-decoration-underline">Industry</Form.Label>
              <Form.Control ref={industry} name="industry" type="text" placeholder="Web Development/Health Care/Sports/Legal/Software/IT" required />
            </Form.Group>

            {/* ADD REQUIRED SKILLS */}
            <Form.Group className="mb-4">
              <Form.Label as="legend" className="text-success fw-bold text-decoration-underline">Required Skills</Form.Label>
              <ul className="list-unstyled">
                {requiredSkills.length ? requiredSkills.map((skill, i) => (
                  <li key={i}>
                    <CustomButton // Button to remove Skill
                      text="-"
                      customClasses="Button Button--warning--outline Button-text-warning"
                      onClick={(evt) => {
                        evt.preventDefault()
                        setRequiredSkills(requiredSkills.filter((skill, j) => i !== j))
                      }}
                    />
                    {skill}
                  </li>)) : (<li className="text-warning">You need to add at least one required skill for a job.</li>)}
              </ul>
              <Form.Control name="skills" ref={skills} placeholder="add skills..." required={requiredSkills.length ? false : true} onKeyPress={(evt)=>{(evt.charCode===13)?evt.preventDefault():null}}/>
              <CustomButton customClasses="Button Button--green--outline Button-text" text="+ Add Required Skill" onClick={(evt) => {
                evt.preventDefault()
                if (skills.current.value === "") {
                  skills.current.focus()
                }
                let skill = requiredSkills.slice()
                skill.push(skills.current.value.trim())
                setRequiredSkills(skill)
                skills.current.value = ""
                skills.current.focus()
              }} />

            </Form.Group>

            <Col size={12}>
              <CustomButton
                type="submit"
                text="Submit"
                customClasses="Button Button--success"
              />
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default AddJobs