import React, { useState, useRef } from 'react'
import { Modal, Form, InputGroup } from 'react-bootstrap'

import CustomButton from './../../../components/CustomButton/CustomButton'
import apis from './../../../api/axiosApi'
import { timeYearMonthDay } from '../../../lib/calculateTime'
import './Resume.css'

function EditResume({ experience, education, skills, setUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [edu, setEdu] = useState(education)
  const [skilla, setSkilla] = useState(skills)

  const eduInput = useRef(null)
  const skillInput = useRef(null)

  const addToList = (list, listRef, listSetFunc) => {
    if (listRef.current.value === "") return listRef.current.focus()
    let addToNewList = list.slice()
    addToNewList.push(listRef.current.value)
    listSetFunc(addToNewList)
    listRef.current.value = ""
  }

  const editResumeHandler = (evt) => {

    evt.preventDefault()
    apis.editResume({
      url: '/api/user',
      headers: { "jwt": sessionStorage.getItem('jwt') },
      body: {
        resume: {
          experience: evt.currentTarget.experience.value,
          education: edu,
          skills: skilla,
          update: evt.currentTarget.time.value
        }
      }
    })
      .then(res => {
        setUser(res.data.data)
        handleClose()
      })
      .catch(err => {
        console.log('EditResume Error: ', err)
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
      <div className="text-center">
        <CustomButton customClasses="Button Button--green" text="Edit Resume" onClick={handleShow} />
      </div>

      <Modal show={show} onHide={() => {
        handleClose()
        setEdu(education)
        setSkilla(skills)
      }}>
        <Modal.Header closeButton={false} closeLabel="x">
          <Modal.Title>Edit your resume</Modal.Title>
        </Modal.Header>
        {/* BODY */}
        <Modal.Body>
          <Form onSubmit={editResumeHandler}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Update: {`${timeYearMonthDay(new Date())}`}</Form.Label>
              <Form.Control name="time" type="hidden" value={new Date().toISOString()} />
            </Form.Group>

            {/* EPERIENCE Blurb */}
            <Form.Label style={{ fontVariantCaps: 'small-caps' }}>Experience:</Form.Label>
            <textarea name="experience" className="EditResume-experience" rows="8" defaultValue={experience}></textarea>

            {/* EDUCATION List */}
            <Form.Group className="EditResume-education">
              <Form.Label style={{ fontVariantCaps: 'small-caps' }}>Education:</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control ref={eduInput} onKeyPress={(evt) => {
                  if (evt.charCode === 13) {
                    evt.preventDefault()
                    addToList(edu, eduInput, setEdu)
                    eduInput.current.focus()
                  }
                }} />
                <InputGroup.Prepend
                  className="EditResume-InputGroupText"
                  onClick={(e) => {
                    e.preventDefault()
                    addToList(edu, eduInput, setEdu)
                    eduInput.current.focus()
                  }}
                >
                  <InputGroup.Text >+ Education</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
              <ul style={{ listStyle: 'none' }}>
                {edu.map((ed, idx) => <li key={idx}><CustomButton onClick={(e) => {
                  e.preventDefault()
                  let editedEdu = edu.filter((a, b) => b !== idx)
                  setEdu(editedEdu)
                }}
                  customClasses="Button Button--warning--outline Button-text-warning"
                >X</CustomButton>{ed}</li>)}
              </ul>
            </Form.Group>

            {/* SKILLS List */}
            <Form.Group className="EditResume-skills">
              <Form.Label style={{ fontVariantCaps: 'small-caps' }}>Skills:</Form.Label>
              {/* Input field for skills */}
              <InputGroup className="mb-3">
                <Form.Control ref={skillInput} onKeyPress={(evt) => {
                  if (evt.charCode === 13) {
                    evt.preventDefault()
                    addToList(skilla, skillInput, setSkilla)
                    skillInput.current.focus()
                  }
                }} />
                <InputGroup.Prepend
                  className="EditResume-InputGroupText"
                  onClick={(e) => {
                    e.preventDefault()
                    addToList(skilla, skillInput, setSkilla)
                    skillInput.current.focus()
                  }}>
                  <InputGroup.Text >+ Skills</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
              <ul style={{ listStyle: 'none' }}>
                {skilla.map((skill, idx) => <li key={idx}><CustomButton onClick={(e) => {
                  e.preventDefault()
                  let editedSkilla = skilla.filter((a, b) => b !== idx)
                  setSkilla(editedSkilla)
                }}
                  customClasses="Button Button--warning--outline Button-text-warning"
                >x</CustomButton>{skill}</li>)}
              </ul>
            </Form.Group>

            <CustomButton //Save changes
              customClasses="Button Button--success mx-5"
              text="Save Changes"
              type="submit"
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {/* Close Resume Modal with NO changes */}
          <CustomButton
            text="Close"
            customClasses="Button Button--danger mx-5"
            onClick={() => {
              handleClose()
              setEdu(education)
              setSkilla(skills)
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditResume;
