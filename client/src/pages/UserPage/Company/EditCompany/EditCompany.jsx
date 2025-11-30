import React, { useState, useRef } from 'react'
import { Modal, Form, Col } from 'react-bootstrap'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import apis from '../../../../api/axiosApi'

const EditCompany = props => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditCompanySubmit = (evt) => {
    evt.preventDefault()
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      return evt.preventDefault()
    }
    apis.editCompany({
      url: `/api/companylist/editcompany/${props.companyId}`,
      headers: { "jwt": sessionStorage.getItem('jwt') },
      body: {
        userId: props.user._id,
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
          sick_leave: evt.target.sick_leave.checked,
          stock_option: evt.target.stock_option.checked,
          vacation: evt.target.vacation.checked
        }
      }
    })
      .then(res => {
        props.setUser(res.data)
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
    setValidated(true)
    handleClose()
  }

  return (

    <>
      <div className="text-center">
        <CustomButton customClasses="Button Button--green" text="Edit Employer Profile" onClick={handleShow} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-uppercase">Edit Company Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated={validated} onSubmit={handleEditCompanySubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCompanyName">
                <Form.Label className="text-success">Company Name</Form.Label>
                <Form.Control type="text" name="name" defaultValue={props.user.companyId.companyName} required />
              </Form.Group>

              <Form.Group as={Col} className="d-flex flex-column">
                <Form.Label className="text-success">Company Description</Form.Label>
                <textarea name="description" defaultValue={props.user.companyId.description} rows="5" required></textarea>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmployeeNum">
                <Form.Label className="text-success">Employee Number</Form.Label>
                <Form.Control type="text" name="employeenumber" defaultValue={props.user.companyId.employeeNumber} required />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="text-success">Address</Form.Label>
              <Form.Control name="street" defaultValue={props.user.companyId.address.streetAddress} required />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label className="text-success">City</Form.Label>
                <Form.Control name="city" defaultValue={props.user.companyId.address.city} required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-success">State</Form.Label>
                <Form.Control name="state" defaultValue={props.user.companyId.address.stateAbbr} required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip" required>
                <Form.Label className="text-success">Zip</Form.Label>
                <Form.Control name="zipcode" defaultValue={props.user.companyId.address.zipCode} required />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group className="mb-4">
                <Form.Label as="legend" className="text-success">Benefits</Form.Label>
                {/* map over benefits and make checkbox */}
                {Object.keys(props.user.companyId.benefits).map((benefit, idx) => <div className="mb-3" key={idx}>
                  <Form.Check type={'checkbox'} id="">
                    <Form.Check.Input type={'checkbox'} name={benefit}/>
                    <Form.Check.Label className="text-dark">{`${benefit.replace("_", " ")}`}</Form.Check.Label>
                  </Form.Check>
                </div>)}
              </Form.Group>
            </Form.Row>
            <CustomButton
              customClasses="Button Button--success"
              text="submit"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton
            customClasses="Button Button--danger"
            onClick={handleClose}
            text="Close"
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditCompany
