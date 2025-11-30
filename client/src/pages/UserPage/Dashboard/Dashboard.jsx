import { useState, useEffect } from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'

import CustomButton from '../../../components/CustomButton/CustomButton'
import Footer from '../../../components/Footer/Footer'
import apis from '../../../api/axiosApi'
import { timeYearMonthDay } from '../../../lib/calculateTime'
import './Dashboard.css'

const Dashboard = ({ user, setXcomp }) => {

  const [appliedJobs, setAppliedJobs] = useState([])
  useEffect(() => {
    apis.getAppliedJobs({
      url: `/api/job/appliedjobs/${user._id}`,
      headers: { 'jwt': sessionStorage.getItem('jwt') }
    })
      .then(res => setAppliedJobs(res.data))
      .catch(err => {
        console.error('Dashboard.jsx\n', err.response.status)
        if (err.response.status >= 400) {
          if (err.response.status === 401) {
            location.replace('/login')
          }
          location.replace('/err')
        }
      })
  }, [])

  // Clicking Cards to different component
  const bookmardAndApplied = () => setXcomp('bookmarked_jobs')
  const resume = () => setXcomp('resume')
  const companyProfile = () => setXcomp('company')
  const openPositions = () => setXcomp('open_positions')

  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <div>
        <div className="display-6 text-center">Welcome, <span className="text-success">{user.email}</span></div>
        <Row className="mt-2 gy-3 text-center">
          <h1 className="text-center text-light bg-success">User Info</h1>
          <Col xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center">
            <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={bookmardAndApplied}>
              <Card.Img variant="top" src="./image/chiara-f-MI8He1NWPWg-unsplash.jpg" alt="holder" />
              <Card.Body>
                <Card.Title>Bookmarked Jobs</Card.Title>
                <Card.Text>
                  <span className="badge bg-danger text-light">{user.bookmarkJob.length}</span>
                </Card.Text>
              </Card.Body>
              <CustomButton
                customClasses="Button Button--green"
                text="Go"
              />
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center">
            <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={bookmardAndApplied}>
              <Card.Img variant="top" src="./image/markus-winkler-XKKuY4ottJ0-unsplash.jpg" alt="holder" />
              <Card.Body>
                <Card.Title># of Jobs Applied To</Card.Title>
                <Card.Text>
                  <span className="badge bg-danger text-light">{appliedJobs.length}</span>
                </Card.Text>
              </Card.Body>
              <CustomButton
                customClasses="Button Button--green"
                text="Go"
              />
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center">
            <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={resume}>
              <Card.Img variant="top" src="./image/markus-winkler-7iSEHWsxPLw-unsplash.jpg" alt="holder" />
              <Card.Body>
                <Card.Title>Resume Updated On</Card.Title>
                <Card.Text>
                  {timeYearMonthDay(user.resume.update)}
                </Card.Text>
              </Card.Body>
              <CustomButton
                customClasses="Button Button--green"
                text="edit"
              />
            </Card>
          </Col>

        </Row>
        {(user.hasCompany)
          ? <Row className="Dashboard-Row2 mt-2 gy-3">
            <h1 className="text-center text-light bg-success">Employer Info</h1>
            <Col xs={12} sm={6} md={6} className="d-flex flex-row align-items-center justify-content-center border" style={{ cursor: 'pointer' }} onClick={openPositions}>
              <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={companyProfile}>
                <Card.Img variant="top" src="#" alt="holder" />
                <Card.Body>
                  <Card.Title className="text-center">Job Positions Posted</Card.Title>
                  <Card.Text className="text-center">
                    <span className="badge bg-warning text-success">{user.companyId.jobs.length}</span>
                  </Card.Text>
                </Card.Body>
                <CustomButton
                  customClasses="Button Button--green"
                  text="go"
                />

              </Card>

            </Col>
            <Col xs={12} sm={6} md={6} className="text-center border" style={{ cursor: 'pointer' }} onClick={openPositions}>
              <h4 className="Dashboard-h4 text-decoration-underline"># of Applicants</h4>
              <ul className="list-unstyled">
                {(user.companyId.jobs.length)
                  ? user.companyId.jobs.map((job, idx) => {
                    return <li key={idx} className="text-start"><span className="badge bg-warning text-success">{job.applicants.length}</span><span className="ms-2">{job.title}</span> </li>
                  })
                  : 'None Listed'
                }
              </ul>
            </Col>
            <Col xs={12} sm={12} md={12} className="d-flex flex-row align-items-center justify-content-center mb-3">
              <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={companyProfile}>
                <Card.Img variant="top" src="#" alt="holder" />
                <Card.Body>
                  <Card.Title>Company Profile Last Updated On</Card.Title>
                  <Card.Text>
                    {timeYearMonthDay(user.resume.update)}
                  </Card.Text>
                </Card.Body>
                <CustomButton
                  customClasses="Button Button--green"
                  text="edit"
                />
              </Card>
            </Col>
          </Row>
          :
          <Row className="Dashboard-Row2 mt-2 gy-3">
            <h1 className="text-center">Are you an Employer?</h1>
            <Col size={12} className="d-flex justify-content-center">
              <Button onClick={companyProfile} variant="outline-success">Create Company Profile</Button>
            </Col>
          </Row>
        }
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard