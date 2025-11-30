import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import CreateCompany from './EditCompany/CreateCompany'
import EditCompany from './EditCompany/EditCompany'
import './Company.css'

const Company = ({ userId, hasCompany, user, setUser, company }) => {
  const [companyValidation, setCompanyValidation] = useState("Must Create employer profile")

  return (
    <div>
      {/* hasComany ? EditCompany : CreateCompany  */}
      {hasCompany ? <EditCompany user={user} setUser={setUser} hasCompany={hasCompany} companyId={user.companyId._id} /> : <CreateCompany setCompanyValidation={setCompanyValidation} userId={userId} setUser={setUser} hasCompany={hasCompany} />}
      {(company || hasCompany)
        ? (
          <><div className="text-center display-3 border-bottom">{company.companyName}</div>

            <Row className="gy-2">
              <Col xs={12} sm={{ span: 5, offset: 1 }} className="border-end">
                <h4 className="Company-h4 text-decoration-underline">Address: </h4>
                {company.address.streetAddress}<br></br>{company.address.city} {company.address.stateAbbr}, {company.address.zipCode}
              </Col>
              <Col xs={12} sm={{ span: 5, offset: 1 }} className="">
                <h4 className="Company-h4 text-decoration-underline">Number of Employees: </h4>
                {company.employeeNumber}
              </Col>
            </Row>


            <Row className="">
              <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} className="border-top">
                <h4 className="Company-h4 text-decoration-underline">Description: </h4>
                <div className="Company-description">
                  {company.description}
                </div>
              </Col>
            </Row>

            {/* Benefits */}
            <Row>
              <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} className="border-top">
                <h4 className="Company-h4 text-decoration-underline">Benefits: </h4>
                <ul>
                  {Object.keys(company.benefits).map((benefit, idx) => {
                    return company.benefits[benefit] ? <li key={idx}>{benefit.replace("_", " ").toUpperCase()}: <i className="fa fa-check text-success"></i></li> : <li key={idx}>{benefit.replace("_", " ").toUpperCase()}: <i className="fa fa-times text-danger"></i></li>
                  })}
                </ul>
              </Col>
            </Row>

          </>
        )
        : (
          <div className="Company-h4 text-center display-4">{companyValidation ? companyValidation : null}</div>
        )
      }

    </div>
  )
}
export default Company;
