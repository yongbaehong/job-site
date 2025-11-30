import React, { useState } from 'react'
import { Modal, Form, Col } from 'react-bootstrap'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import apis from '../../../../api/axiosApi'

const CreateCompany = props => {
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleCreateCompanyProfile = (evt) => {
    evt.preventDefault()
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      return evt.preventDefault()
    }
    setValidated(true)

    apis.createCompany({
      url: '/api/companylist/createcompany',
      headers: { "jwt": sessionStorage.getItem('jwt') },
      body: {
        userId: props.userId,
        companyName: evt.currentTarget.name.value,
        employeeNumber: evt.currentTarget.employeenumber.value,
        address: {
          streetAddress: evt.currentTarget.street.value,
          city: evt.currentTarget.city.value,
          stateAbbr: evt.currentTarget.state.value,
          zipCode: evt.currentTarget.zipcode.value
        },
        description: evt.currentTarget.description.value,
        benefits: {
          insurance: evt.target.insurance.checked,
          daycare: evt.target.daycare.checked,
          medical: evt.target.medical.checked,
          sick_leave: evt.target.sickLeave.checked,
          stock_option: evt.target.stockOp.checked,
          vacation: evt.target.vacation.checked
        }
      }
    })
      .then(res => {
        props.setUser(res.data)
      })
      .catch(err => {
        props.setCompanyValidation(err.response.data.msg)
      })
    handleClose()
  }

  return (

    <>
      <div className="text-center">
        <CustomButton customClasses="Button Button--green" onClick={handleShow} text="Create Company Profile" />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-uppercase">Create Company Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated={validated} onSubmit={handleCreateCompanyProfile}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCompanyName">
                <Form.Label className="text-success">Company Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter companyName"
                  required
                  autoFocus />
              </Form.Group>

              <Form.Group className="d-flex flex-column">
                <Form.Label className="text-success">Company Description</Form.Label>
                <textarea name="description" className="" rows="5" required></textarea>
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridEmployeeNum"> */}
              <Form.Group controlId="formGridEmployeeNum">
                <Form.Label className="text-success">Number of Employees</Form.Label>
                <Form.Control name="employeenumber" type="text" placeholder="1234" required />
              </Form.Group>

            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="text-success">Address</Form.Label>
              <Form.Control name="street" placeholder="1234 Main St" required />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label className="text-success">City</Form.Label>
                <Form.Control name="city" required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-success">State</Form.Label>
                <Form.Control name="state" placeholder="State, Province, Territory" required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label className="text-success">Zip Code</Form.Label>
                <Form.Control name="zipcode" required />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group className="mb-4">
                <Form.Label as="legend" className="text-success">Benefits</Form.Label>
                <div className="mb-3">
                  <Form.Check type={'checkbox'} id="">
                    <Form.Check.Input type={'checkbox'} name="insurance" />
                    <Form.Check.Label className="text-dark">{`Insurance`}</Form.Check.Label>
                  </Form.Check>
                </div>
                <div className="mb-3">
                  <Form.Check type={'checkbox'} id="">
                    <Form.Check.Input type={'checkbox'} name="daycare" />
                    <Form.Check.Label className="text-dark">{`Daycare`}</Form.Check.Label>
                  </Form.Check>
                </div>
                <div className="mb-3">
                  <Form.Check type={'checkbox'} id="">
                    <Form.Check.Input type={'checkbox'} name="medical" />
                    <Form.Check.Label className="text-dark">{`Medical`}</Form.Check.Label>
                  </Form.Check>
                </div>
                <div className="mb-3">
                  <Form.Check type={'checkbox'} id="">
                    <Form.Check.Input type={'checkbox'} name="sickLeave" />
                    <Form.Check.Label className="text-dark">{`Sick leave`}</Form.Check.Label>
                  </Form.Check>
                </div>
                <div className="mb-3">
                  <Form.Check type={'checkbox'} id="">
                    <Form.Check.Input type={'checkbox'} name="stockOp" />
                    <Form.Check.Label className="text-dark">{`Stock Option`}</Form.Check.Label>
                  </Form.Check>
                </div>
                <div className="mb-3">
                  <Form.Check type={'checkbox'} id="">
                    <Form.Check.Input type={'checkbox'} name="vacation" />
                    <Form.Check.Label className="text-dark">{`Vacation`}</Form.Check.Label>
                  </Form.Check>
                </div>

              </Form.Group>
            </Form.Row>

            <CustomButton
              text="submit"
              customClasses="Button Button--success"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton customClasses="Button Button--danger" onClick={handleClose} text="Close" />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateCompany
