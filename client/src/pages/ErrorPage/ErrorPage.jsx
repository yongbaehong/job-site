import React from 'react'

import CustomJumbotron from '../../components/CustomJumbotron/CustomJumbotron'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import Footer from '../../components/Footer/Footer'
import CustomButton from '../../components/CustomButton/CustomButton'
import './ErrorPage.css'

const ErrorPage = ({ history }) => {
  return (
    <PageTemplate>
      <CustomJumbotron
        bgImage="../image/kostiantyn-li-Fi_nhg5itCw-unsplash.jpg"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center center"
        height="99vh"
        customJumbotronCss="User-CustomJumbotron-Error"
      >

        <p className="ErrorPage-msg">ERROR</p>
        <p className="ErrorPage-msg">Sorry, there was a bad request. <br></br>Try going back.</p>
        <CustomButton
          customClasses="Button Button--green"
          text="go back home"
          onClick={() => {
            history.replace({pathname: '/'})
          }}
        />
      </CustomJumbotron>
      <Footer />
    </PageTemplate>

  )
}

export default ErrorPage;