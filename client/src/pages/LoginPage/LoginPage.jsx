import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'

import apis from '../../api/axiosApi'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import CustomButton from '../../components/CustomButton/CustomButton'
import './LoginPage.css'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errStatus: "",
      errStatusText: "",
      errMessage: ""
    }
  }

  onSubmitHandler = (evt) => {
    evt.preventDefault()
    apis.signinUser({
      url: '/signin',
      body: {
        email: evt.currentTarget.email.value,
        password: evt.currentTarget.password.value
      }
    })
      .then(res => {
        // Set token for user and redirect to User Component
        window.sessionStorage.setItem('jwt', `Bearer ${res.data.token}`)
        this.props.history.replace({ pathname: '/user' })
      })
      .catch(err => {
        if (err.response.status >= 400) {
          this.setState({
            errStatus: err.response.status,
            errStatusText: err.response.statusText,
            errMessage: err.response.data.message
          })
        }
        console.log('other err', err)
      })
  }

  render() {
    const { errStatus, errStatusText, errMessage } = this.state
    return (
      <PageTemplate>
        <Row className="justify-content-center d-flex align-content-center h-100 LoginPage-row">
          <Col sm={{ span: 4, offset: 1 }} className="d-flex align-items-center" style={{marginTop: '5rem'}}>
            <div>
              <div className="text-center text-white display-3">Log In</div>
              {errStatus ? (<div className="text-center text-warning">{errStatus}: {errStatusText} - {errMessage}</div>) : ""}
            </div>
          </Col>

          <Col sm={4} className="">
            <Form className="" onSubmit={this.onSubmitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="LoginPage-label">E-mail address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="LoginPage-label">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" required />
              </Form.Group>

              <CustomButton
                customClasses="Button Button--green"
                type="submit"
                text="Submit"
              />
            </Form>

            <div className="align-self-end d-flex flex-column justify-content-center">
              <p className="text-center mt-5 text-uppercase text-white">Don't have an account?</p>
              <Link to="/signup" className="text-center fs-3">Sign Up</Link>
            </div>
          </Col>
        </Row>
      </PageTemplate>
    )
  }
}

export default LoginPage