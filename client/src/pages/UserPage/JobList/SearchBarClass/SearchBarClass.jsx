import React from 'react'
import { Form, Spinner } from 'react-bootstrap'

import CustomButton from '../../../../components/CustomButton/CustomButton'
import apis from './../../../../api/axiosApi'
import './SearchBarClass.css'

class SearchBarClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      city: "",
    }
    this.titleRef = React.createRef()
    this.cityRef = React.createRef()
  }

  /**
   * COMPONENT DIDUPDATE()
   * `RUBRIC requirement`
   */
  // Check to see if user enters non-alphanumeric characters
  componentDidUpdate() {
    let { title, city } = this.state
    let updateTitle = title, updateCity = city;
    if (title.length > 0 || city.length > 0) {
      // starting over, replace placeholders to original value
      this.titleRef.current.placeholder = "Job Title"
      this.cityRef.current.placeholder = "City"
      if (title.includes(",") || city.includes(",") || title.includes("'") || city.includes("'")) {
        updateTitle = title.replaceAll(",", "").replaceAll("'", "")
        updateCity = city.replaceAll(",", "").replaceAll("'", "")
      }
      if (/\W/.test(updateTitle.replaceAll(" ", ""))) {
        this.titleRef.current.value = ""
        this.titleRef.current.placeholder = "Invalid characters"
        this.setState({ title: "" })
      }
      if (/\W/.test(updateCity.replaceAll(" ", ""))) {
        this.cityRef.current.value = ""
        this.cityRef.current.placeholder = "Invalid characters"
        this.setState({ city: "" })
      }
    }
  }

  searchWords = (evt) => {
    evt.preventDefault()
    let { title, city } = this.state
    this.props.setLoading(true)
    apis.searchJobByTitleOrCity({
      url: '/api/job/searchjobs',
      headers: { 'jwt': sessionStorage.getItem('jwt') },
      body: {
        jobTitle: title,
        city: city
      }
    })
      .then(res => {
        this.props.setLoading(false)
        this.props.setAllJobs(res.data)
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

  onTitleChangeHandler = (evt) => {
    evt.preventDefault()
    this.setState({
      title: evt.currentTarget.value
    })
  }
  onCityChangeHandler = (evt) => {
    evt.preventDefault()
    this.setState({
      city: evt.currentTarget.value
    })
  }

  render() {
    return (
      <>
        <Form className="d-flex flex-row justify-content-center p-2 ps-5 pe-5" id="SearchBar-background" style={{ margin: '5px 0px' }} onSubmit={this.searchWords} >
          <Form.Control name="title" type="text" placeholder="Job Title" onChange={this.onTitleChangeHandler} ref={this.titleRef} />
          <Form.Control name="city" type="text" placeholder="City" onChange={this.onCityChangeHandler} ref={this.cityRef} />
          <CustomButton
            customClasses="Button Button--success"
            text={this.props.loading ? <Spinner className="mt-1" animation="border" variant="warning" /> : <i className="fa fa-search"></i>}
          />
        </Form>
      </>
    )
  }
}

export default SearchBarClass;