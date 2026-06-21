import Container  from 'react-bootstrap/Container'
import Navigation from './../Navigation/Navigation'
import './PageTemplate.css'

const PageTemplate = props => {
  return (
    <Container
      fluid={true}
      className={`PageTemplate ${props.customClasses? props.customClasses: ""}`}
      style={{ backgroundColor: '#f5f6f2' }}
    >
      <Navigation user={props.user} xComp={props.xComp}/>
          {props.children}
    </Container>
  )
}

export default PageTemplate