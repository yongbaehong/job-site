import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})
// SIGN-UP / SIGN-IN
const signupUser = ({ url, body }) => api.post(url, body)
const signinUser = ({ url, body }) => api.post(url, body)
// USER
const getUser = ({ url, headers }) => api.get(url, { headers })
const editResume = ({ url, body, headers }) => api.put(url, body, { headers })
// JOBS
const getAllJobs = ({ url, headers }) => api.get(url, { headers })
const searchJobByTitleOrCity = ({ url, body, headers }) => api.post(url, body, { headers })
const getBookmarkJobs = ({ url, headers }) => api.get(url, { headers })
const removeBookmarkJob = ({ url, body, headers }) => api.put(url, body, { headers })
const bookmarkJob = ({ url, body, headers }) => api.put(url, body, { headers })
const applyToJob = ({ url, body, headers }) => api.put(url, body, { headers })
const unapplyJob = ({ url, body, headers }) => api.put(url, body, { headers })
const getAppliedJobs = ({ url, headers }) => api.get(url, { headers })

// COMPANY
const createCompany = ({ url, body, headers }) => api.post(url, body, { headers })
const singleCompany = ({ url, headers }) => api.get(url, { headers })
const editCompany = ({ url, body, headers }) => api.put(url, body, { headers })
const addJobs = ({ url, body, headers }) => api.post(url, body, { headers })
const removeJob = ({ url, body, headers }) => api.put(url, body, { headers })

// Export methods in object
const apis = {
  signupUser,
  signinUser,

  getUser,
  editResume,

  getAllJobs,
  searchJobByTitleOrCity,
  bookmarkJob,
  getBookmarkJobs,
  removeBookmarkJob,
  applyToJob,
  unapplyJob,

  getAppliedJobs,
  
  createCompany,
  singleCompany,
  editCompany,
  addJobs,
  removeJob
}

export default apis