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



function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/jobs' element={<FindJobs />} />
        {/* recruiter */}
        <Route path='recruiter/companies' element={<Companies />} />
        <Route path='/recruiter/companies/create' element={<CreateCompany />} />
        <Route path='/recruiter/jobs' element={<RecruiterJobs />} />
        <Route path='/recruiter/jobs/create' element={<PostJob />} />
        <Route path='/recruiter/companies/:id' element={<EditCompany />} />
        <Route path='/recruiter/jobs/:id/applicants' element={<Applicants />} />
        <Route path='/*' element={<Pnf/>} />
      </Routes>
    </>
  )
}

export default App
