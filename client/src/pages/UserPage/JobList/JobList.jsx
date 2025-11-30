import React, { useState, useEffect } from 'react'
import { ListGroup, Spinner } from 'react-bootstrap'
import SearchBarClass from './SearchBarClass/SearchBarClass'
import JobListItem from './JobListItem/JobListItem'
import SingleCompany from './SingleCompany/SingleCompany'
import apis from '../../../api/axiosApi'
import './JobList.css'

const JobList = ({ userId, user, setUser, scroll }) => {
  const [loading, setLoading] = useState(false)
  const [jobTitleAnime, setJobTitleAnime] = useState(false)

  const [allJobs, setAllJobs] = useState([])
  const [singleCompany, setSingleCompany] = useState(null)
  const [showSingleCompanyMobile, setShowSingleCompanyMobile] = useState(false)

  // set inital job list with all jobs
  useEffect(() => {
    setLoading(true)
    apis.getAllJobs({
      url: `/api/job/getalljobs`,
      headers: { "jwt": sessionStorage.getItem('jwt') }
    })
      .then(res => {
        setLoading(false)
        setAllJobs(res.data)
      }).catch(err => {
        console.error('JobList.jsx>useEffect()', err)
        if (err.response.status >= 400) {
          if (err.response.status === 401) {
            return location.replace('/login')
          }
          return location.replace('/err')
        }
      })
  }, [])

  // get single company data to display
  const getSingleCompany = (companyId, jobId) => {
    apis.singleCompany({
      url: `/api/companylist/${companyId}`,
      headers: { 'jwt': sessionStorage.getItem('jwt') }
    })
      .then(res => {
        scroll()
        let singleCompanyFilteredJob = res.data.jobs.filter((filterJob, i) => filterJob._id === jobId)
        res.data.jobs = singleCompanyFilteredJob
        setSingleCompany(res.data)
      })
      .catch(err => {
        console.error('JobList.jsx>getSingleCompany()', err)
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

  return (
    <>
      {/* <SearchBar setAllJobs={setAllJobs} setLoading={setLoading} loading={loading} /> */}
      <SearchBarClass setAllJobs={setAllJobs} setLoading={setLoading} loading={loading} />

      <div className="JobLists-Company pb-5">
        <ListGroup className="JobListItem pb-5">
          {loading ? <h4 className="text-center JobsList-heading mt-4"><Spinner className="" animation="border" variant="warning" /> Searching...</h4> : <h4 className="text-center JobsList-heading mt-4">Currenty showing <div className="badge rounded-pill bg-success">{allJobs.length}</div> Jobs</h4>}
          {(allJobs.length === 0 && loading === false)
            ? <p className="display-5 text-center text-success">Search resulted with nothing.</p> // FIX THIS TEXT TO SOMETHING MORE FANCY
            : allJobs.map((job, idx) => {
              return (
                <JobListItem
                  setUser={setUser}
                  user={user}
                  userId={userId}
                  companyId={job.companyId._id}
                  jobId={job._id}
                  jobTitle={job.title}
                  jobCreatedAt={job.createdAt}
                  companyName={job.companyId.companyName}
                  companyCity={job.companyId.address.city}
                  companyState={job.companyId.address.stateAbbr}
                  key={idx}
                  getSingleCompany={getSingleCompany}
                />
              )
            })}
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

export default JobList