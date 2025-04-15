import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FindJobs from './pages/FindJobs'
import Profile from './pages/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import Companies from './pages/Companies'
import CreateCompany from './components/recruiter/CreateCompany'
import RecruiterJobs from './pages/RecruiterJobs'
import PostJob from './components/recruiter/PostJob'
import EditCompany from './components/recruiter/EditCompany'
import Header from './components/Header'
import Applicants from './components/recruiter/Applicants'
import Pnf from './pages/Pnf'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/recruiter/ProtectedRoute'
import ProtectedRouteCandidate from './components/candidate/ProtectedRouteCandidate'

function App() {

  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<ProtectedRouteCandidate><Home /></ProtectedRouteCandidate>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/profile' element={<ProtectedRouteCandidate><Profile /></ProtectedRouteCandidate>} />
        <Route path='/jobs' element={<ProtectedRouteCandidate><FindJobs /></ProtectedRouteCandidate>} />
        {/* recruiter */}
        <Route path='/recruiter/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path='/recruiter/companies/create' element={<ProtectedRoute><CreateCompany /></ProtectedRoute>} />
        <Route path='/recruiter/jobs' element={<ProtectedRoute><RecruiterJobs /></ProtectedRoute>} />
        <Route path='/recruiter/jobs/create' element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path='/recruiter/companies/:id' element={<ProtectedRoute><EditCompany /></ProtectedRoute>} />
        <Route path='/recruiter/jobs/:id/applicants' element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path='/*' element={<Pnf />} />
      </Routes >
    </>
  )
}

export default App
