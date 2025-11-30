import React, { useRef, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

import apis from './../../api/axiosApi'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import CustomButton from '../../components/CustomButton/CustomButton'
import './LoginPage.css'

const SignupPage = ({ history }) => {
  const userEmail = useRef(null)
  const userPassword = useRef(null)
  const [txt, setTxt] = useState("")
  function signup(e) {
    e.preventDefault()
    apis.signupUser({
      url: '/signup',
      body: {
        email: userEmail.current.value,
        password: userPassword.current.value
      }
    })
      .then(res => {
        window.sessionStorage.setItem('jwt', `Bearer ${res.data.token}`)
        history.replace({ pathname: '/user' })
      })
      .catch(err => {
        if (err.response.status > 400) {
          setTxt(`This email might exist already.`)
        }
        console.warn(err.response.statusText)
      })
  }

  return (
    <PageTemplate className="">

      <Row className="justify-content-center d-flex align-content-center h-100 SignupPage-row">
        <Col sm={4}>
          <div className="text-center display-2 text-success my-5">Sign Up</div>
          <Form className="" onSubmit={signup}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="LoginPage-label">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={userEmail} required />
              <Form.Text className="LoginPage-text">
                {txt}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="LoginPage-label">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={userPassword} required />
            </Form.Group>
            <CustomButton
              customClasses="Button Button--green"
              type="submit"
              text="Submit"
            />
          </Form>
        </Col>
      </Row>

    </PageTemplate>
  )
}

export default SignupPage;
