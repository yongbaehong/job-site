import React from 'react'
import { Row, Col } from 'react-bootstrap'

const CustomJumbotron = props => {
  console.log('CustomJumbotron props.bgImage:', props.bgImage);
  const style = {
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 100%, rgba(0, 0, 0, 0.4)), url(${props.bgImage})`,
    backgroundRepeat: `${props.bgRepeat}`,
    backgroundSize: `${props.bgSize}`,
    backgroundPosition: `${props.bgPosition}`,
    height: `${props.height}`
  }

  return (
      <Row className={`d-flex flex-column justify-content-center align-items-center ${props.customJumbotronCss}`} style={style}>
        <Col sm={12} ><div className="text-center fw-light">{props.text}</div></Col>
        <Col sm={12} className="text-center">
          {props.children} 
        </Col>
      </Row>
  )
}

export default CustomJumbotron