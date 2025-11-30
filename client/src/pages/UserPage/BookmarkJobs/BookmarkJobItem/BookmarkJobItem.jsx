import React from 'react'
import { ListGroup } from 'react-bootstrap'
import moment from 'moment'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import { timeDiffFromNow } from '../../../../lib/calculateTime'
import './BookmarkJobItem.css'

const BookmarkJobItem = ({ createdAt, userId, jobId, jobTitle, companyId, companyName, companyAddress, getSingleCompany, removeJobFromBookmarkJob, showAppliedJobItem }) => {
  return (
    <ListGroup.Item className="BookmarkJobItem">
      <div className="createdAt">Posted: {`${timeDiffFromNow(createdAt)}`}</div>
      <div className="companyJob">{jobTitle}</div>
      <div className="companyName">{companyName}</div>
      <div>
        {companyAddress.city}, {companyAddress.stateAbbr}
      </div>
      <div className="d-flex justify-content-center">
        <CustomButton
          customClasses="Button Button--green"
          onClick={() => getSingleCompany(companyId, jobId)}
          text="View"
        />

        {showAppliedJobItem
          ? ""
          : <CustomButton
            customClasses="Button Button--warning--outline Button-text-warning"
            onClick={() => removeJobFromBookmarkJob(userId, jobId)}
            text="unmark"
          />}
      </div>
    </ListGroup.Item>
  )
}

export default BookmarkJobItem