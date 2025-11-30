import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = () =>
  <footer className="pt-5 pb-5" style={{backgroundColor: '#bfe195', width: '100%'}}>
    <Row className="m-0 p-0">
      <Col xs={6} sm={6} md={6} className="text-center m-0 p-0">
        <h4 className="text-white">Powered By</h4>
        The LastMile &trade;
      </Col>
      <Col xs={6} sm={6} md={6} className="text-center m-0 p-0">
        <h4 className="text-white">Developed By</h4>
        Yong Hong
      </Col>
    </Row>
    <p className="text-center pt-5 text-light">&copy; <small>2021</small> Métier</p>
  </footer>
export default Footer
