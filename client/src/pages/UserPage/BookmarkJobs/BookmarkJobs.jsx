import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

import BookmarkJobItem from './BookmarkJobItem/BookmarkJobItem'
import JobListItem from '../JobList/JobListItem/JobListItem'
import SingleCompany from '../JobList/SingleCompany/SingleCompany'
import apis from '../../../api/axiosApi'
import CustomButton from '../../../components/CustomButton/CustomButton';
import '../JobList/JobList.css'

const BookmarkJobs = ({ userId, user, setUser, scroll }) => {
  const [jobTitleAnime, setJobTitleAnime] = useState(false)

  const [bookmarkJobs, setBookmarkJobs] = useState([])
  const [singleCompany, setSingleCompany] = useState(null)
  const [showSingleCompanyMobile, setShowSingleCompanyMobile] = useState(false)
  const [showAppliedJobItem, setShowAppliedJobItem] = useState(false)

  useEffect(() => {
    apis.getBookmarkJobs({
      url: `/api/user/bookmarked/${userId}`,
      headers: { 'jwt': sessionStorage.getItem('jwt') }
    })
      .then(res => {
        setBookmarkJobs(res.data.bookmarkJob)
      })
      .catch(err => {
        console.error(err)
        if (err.response.status >= 400) {
          if (err.response.status === 401) {
            return location.replace('/login')
          }
          return location.replace('/err')
        }
      })
  }, [])

  const switchBetweenBookmarkAndAppliedJobs = (showApplied) => {
    setShowAppliedJobItem(showApplied)
    showAppliedJobItem
      ? apis.getBookmarkJobs({
        url: `/api/user/bookmarked/${userId}`,
        headers: { 'jwt': sessionStorage.getItem('jwt') }
      })
        .then(res => {
          setBookmarkJobs(res.data.bookmarkJob)
          setSingleCompany(null)
        })
        .catch(err => {
          console.error(err)
          if (err.response.status >= 400) {
            if (err.response.status === 401) {
              return location.replace('/login')
            }
            return location.replace('/err')
          }
        })
      : apis.getAppliedJobs({
        url: `/api/job/appliedjobs/${userId}`,
        headers: { 'jwt': sessionStorage.getItem('jwt') }
      })
        .then(res => {
          setBookmarkJobs(res.data)
          setSingleCompany(null)
        })
        .catch(err => {
          console.warn(err.response.status)
          if (err.response.status >= 400) {
            if (err.response.status === 401) {
              return location.replace('/login')
            }
            return location.replace('/err')
          }
        })
  }

  // get single company data to display
  const getSingleCompany = (companyId, jobId) => {
    apis.singleCompany({
      url: `/api/companylist/${companyId}`,
      headers: { 'jwt': sessionStorage.getItem('jwt') }
    })
      .then(res => {
        let singleCompanyFilteredJob = res.data.jobs.filter((filterJob, i) => filterJob._id === jobId)
        res.data.jobs = singleCompanyFilteredJob
        setSingleCompany(res.data)
        scroll()
      })
      .catch(err => {
        console.error(err)
        if (err.response.status >= 400) {
          if (err.response.status === 401) {
            return location.replace('/login')
          }
          return location.replace('/err')
        }
      })
    setShowSingleCompanyMobile(true)
    setJobTitleAnime(true)
    setTimeout(() => {
      setJobTitleAnime(false)
    }, 1000)
  }
  // remove job from bookmark'd
  const removeJobFromBookmarkJob = (userId, jobId) => {
    apis.removeBookmarkJob({
      url: '/api/user/removebookmarkjob',
      headers: { 'jwt': sessionStorage.getItem('jwt') },
      body: {
        userId: userId,
        jobId: jobId
      }
    })
      .then(res => {
        // redraw bookmark'd job list
        setBookmarkJobs(res.data.bookmarks.bookmarkJob)
        // update all other parts of user component
        setUser(res.data.user)
      })
      .catch(err => {
        console.warn(err)
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
      <div className="BookmarkJobs-Company pb-5">
        {/* List of Bookmark'd Jobs */}
        <ListGroup className="JobListItem pb-5">
          <div className="text-center">
            <h1 className="text-center">
              {showAppliedJobItem
                ? <span><i className="fa fa-marker text-info"></i>Applied To </span>
                : <span><i className="fa fa-bookmark text-warning"></i> Bookmark'd </span>
              }
              <div className="badge rounded-pill bg-danger">{bookmarkJobs.length}</div>  Jobs
            </h1>
            <CustomButton
              customClasses={`Button Button--warning${showAppliedJobItem ? "" : "--outline"}`}
              onClick={() => switchBetweenBookmarkAndAppliedJobs(false)}
              text={`${showAppliedJobItem ? "Show " : ""}Bookmark'd Jobs`}
              disabled={showAppliedJobItem ? false : true}
            />
            <CustomButton
              customClasses={`Button Button--success${showAppliedJobItem ? "--outline" : ""}`}
              onClick={() => switchBetweenBookmarkAndAppliedJobs(true)}
              text={`${showAppliedJobItem ? "" : "Show "}Applied Jobs`}
              disabled={showAppliedJobItem ? true : false}
            />
          </div>

          {showAppliedJobItem
            ? (bookmarkJobs.length === 0)
              ? ""
              : bookmarkJobs.map((job, idx) => {
                return (
                  <JobListItem
                    key={idx}
                    jobTitle={job.title}
                    companyName={job.companyId.companyName}
                    companyCity={job.companyId.address.city}
                    companyState={job.companyId.address.stateAbbr}
                    companyId={job.companyId._id}
                    jobId={job._id}
                    jobCreatedAt={job.createdAt}
                    getSingleCompany={getSingleCompany}
                    userId={userId}
                    user={user}
                    setUser={setUser}
                  />
                )
              })
            : (bookmarkJobs.length === 0)
              ? ""
              : bookmarkJobs.map((job, idx) => {
                return (
                  <BookmarkJobItem
                    key={idx}
                    userId={userId}
                    createdAt={job.createdAt}
                    jobId={job._id}
                    jobTitle={job.title}
                    companyId={job.companyId._id}
                    companyName={job.companyId.companyName}
                    companyAddress={job.companyId.address}
                    getSingleCompany={getSingleCompany}
                    removeJobFromBookmarkJob={removeJobFromBookmarkJob}
                  />
                )
              })
          }
        </ListGroup>
        <SingleCompany
          singleCompany={singleCompany}
          userId={userId}
          user={user}
          getSingleCompany={getSingleCompany}
          showSingleCompanyMobile={showSingleCompanyMobile}
          setShowSingleCompanyMobile={setShowSingleCompanyMobile}
          jobTitleAnime={jobTitleAnime}
        />
      </div>
    </>
  )
}

export default BookmarkJobs;