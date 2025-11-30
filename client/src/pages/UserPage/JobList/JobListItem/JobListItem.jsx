import React from 'react'
import { ListGroup } from 'react-bootstrap'

import CustomButton from './../../../../components/CustomButton/CustomButton'
import apis from '../../../../api/axiosApi'
import {timeDiffFromNow} from '../../../../lib/calculateTime'
import './JobListItem.css'

const JobListItem = ({ jobTitle, companyName, companyCity, companyState, companyId, jobId, jobCreatedAt, getSingleCompany, userId, user, setUser }) => {

  const bookmark = (evt) => {
    evt.preventDefault()
    apis.bookmarkJob({
      url: `/api/user/bookmark`,
      headers: { 'jwt': sessionStorage.getItem('jwt') },
      body: { jobId, userId }
    })
      .then(res => {
        setUser(res.data)
      })
      .catch(err => console.log(err))
  }
  
  return (
    <ListGroup.Item className="JobItem" data-id={companyId}>
      <div className="createdAt">{`Posted: ${timeDiffFromNow(jobCreatedAt)}`}</div>
      <div className="companyJob">{`${jobTitle}`}</div>
      <div className="companyName">{companyName}</div>
      <div className="companyAddress">
        <p>{companyCity}, {companyState}</p>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <CustomButton customClasses="Button Button--green" onClick={() => getSingleCompany(companyId, jobId)} text="view"/>
        {(user.bookmarkJob.includes(jobId))
          ? null
          : (<div className="JobListItem-bookmark-div d-flex text-end align-items-center" onClick={bookmark}>
            <i className="fa fa-bookmark JobListItem-bookmark"></i>
          </div>)}
      </div>
    </ListGroup.Item>
  )
}

export default JobListItem
