import React from 'react'
import { Accordion, Card, Button, Row, Col, Table } from 'react-bootstrap'

import CustomButton from '../../../../components/CustomButton/CustomButton'
import ApplicantResume from './ApplicantResume/ApplicantResume'
import apis from '../../../../api/axiosApi'
import { timeDiffFromNow } from './../../../../lib/calculateTime'
import './OpenPositionsClass.css'

class OpenPositionsClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: props.userId,
      companyId: props.company._id,
      openPositions: [],
      numberOfPositions: "",
      applicant: null,
      showResume: false
    }
  }
/**
 * Set inital State of jobs open/created 
 * `RUBRIC requirement`
 */
  componentDidMount() {
    apis.singleCompany({
      url: `/api/companylist/${this.state.companyId}`,
      headers: { 'jwt': sessionStorage.getItem('jwt') }
    })
      .then(res => {
        this.setState({ openPositions: res.data.jobs, numberOfPositions: res.data.jobs.length })
      })
      .catch(err => {
        console.log(err)
        if (err.response.status >= 400) {
          if (err.response.status === 401) {
            return location.replace('/login')
          }
          return location.replace('/err')
        }
      })
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('OPdidUpdate(): Do something with applicant')
    console.log('prevState',prevState)
    console.log('newState', this.state)
  }

  // REMOVE a job position
  removeJobHandler = (userId, companyId, jobId) => {
    apis.removeJob({
      url: 'api/job/removejob',
      headers: { 'jwt': sessionStorage.getItem('jwt') },
      body: { userId, companyId, jobId }
    })
      .then(res => {
        // reset OpenPositionsClass
        this.setState({
          openPositions: res.data.company.jobs,
          numberOfPositions: res.data.company.jobs.length
        })
        // reset USER
        this.props.setUser(res.data.user)
      })
      .catch(err => {
        console.error(err.response.statusText)
        if (err.response.status >= 400) {
          if (err.response.status === 401) {
            return location.replace('/login')
          }
          return location.replace('/err')
        }
      })
  }

  getApplicant = (applicant) => {
    // Cannot do api call to a Different user who's password did not get hashed and authenticated
    // Got info by populating only the applicants resume from jobs.model Schema directly
    this.setState({
      applicant: applicant,
      showResume: true
    })
  }

  closeApplicantHandler = () => this.setState({ showResume: false })

  render() {
    const { openPositions, userId, companyId, numberOfPositions, applicant, showResume } = this.state
    return (
      <>
        <div className="text-center">
          <CustomButton
            customClasses="Button Button--success"
            text="Add Job"
            onClick={() => this.props.setXcomp('add_job')}
          />
        </div>
        <div className="text-center display-5 m-2"># of Positions <span className="badge rounded-pill bg-success">{numberOfPositions}</span></div>
        <Accordion defaultActiveKey="0">
          {openPositions.length
            // Sort by showing the most recent job added at top
            ? openPositions.sort((a, b) => {
              if (a.createdAt > b.createdAt) {
                return -1
              }
            }).map((position, idx) => {
              return (
                <Card key={idx} className="OpenPositionsClass-Card">
                  <Card.Header className="OpenPositionsClass-CardHeader" as={Row}>

                    <Col xs={12} sm={6} className="text-sm-start text-center fw-bolder text-capitalize">{position.title}</Col>
                    <Col xs={12} sm={6} className="text-sm-end text-center d-flex justify-content-between"><div># of Applicants: {position.applicants.length}</div><div>Posted: {timeDiffFromNow(position.createdAt)}</div></Col>
                    <Accordion.Toggle as={Button} variant="link" eventKey={idx.toString()}>
                      <i className="fa fa-chevron-down fs-3 text-dark"></i>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={idx.toString()}>
                    <Card.Body>
                      <Row>
                        <Col size={6}>
                          <p><span className="SingleCompany-h4 text-decoration-underline">Job-Type:</span> {position.jobType} Time</p>
                        </Col>
                        <Col size={6}>
                          <p><span className="SingleCompany-h4 text-decoration-underline">Industry:</span> {position.industry}</p>
                        </Col>
                      </Row>
                      <hr></hr>
                      <Row>
                        <p><span className="SingleCompany-h4 text-decoration-underline">Description:</span></p>
                        <Col size={12}>
                          {position.description}
                        </Col>
                      </Row>
                      <hr></hr>
                      <Row>
                        <p><span className="SingleCompany-h4 text-decoration-underline">Required Skills</span></p>
                        <Col size={12}>
                          <ol>
                            {position.requiredSkills.map((skill, j) => (
                              <li key={j}>{skill}</li>
                            ))}
                          </ol>
                        </Col>

                      </Row>
                      {/* DELETE BUTTON TO REMOVE A POSITION */}
                      <CustomButton
                        text="remove position"
                        customClasses="Button Button--warning--outline Button-text-warning"
                        onClick={() => this.removeJobHandler(userId, companyId, position._id)}
                      />

                      {position.applicants.length
                        ? <Table
                          striped
                          bordered
                          hover
                          size="sm"
                          variant="dark"
                          responsive
                          className="OpenPositionsClass-table">
                          <caption>Applicants</caption>
                          <thead>
                            <tr>
                              <th className="text-warning">#</th>
                              <th className="text-warning">Email</th>
                              <th className="text-warning">Applied</th>
                              <th className="text-warning">Resume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {position.applicants.map((applicant, i) => {
                              return (
                                <tr key={i}>
                                  <td>{++i}</td>
                                  <td>
                                    {applicant.applicantEmail}
                                  </td>
                                  <td>{timeDiffFromNow(applicant.appliedDate)}</td>
                                  <td>
                                    <CustomButton
                                      customClasses="Button Button--green"
                                      text="view"
                                      onClick={() => this.getApplicant(applicant)}
                                    />
                                  </td>
                                </tr>
                              )
                            }
                            )}
                          </tbody>
                        </Table>
                        : <div className="text-danger">No Applicants</div>
                      }

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            }
            )
            : <p className="text-center text-uppercase fw-bold text-danger">No Positions Currently Created</p>
          }
        </Accordion>
        <ApplicantResume
          applicant={applicant}
          showResume={showResume}
          close={this.closeApplicantHandler}
        />
      </>
    )
  }
}

export default OpenPositionsClass
