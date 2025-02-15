import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FindJobs from './pages/FindJobs'
import Profile from './pages/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import Companies from './components/recruiter/Companies'
import CreateCompany from './components/recruiter/CreateCompany'
import RecruiterJobs from './components/recruiter/RecruiterJobs'
import PostJob from './components/recruiter/PostJob'
import EditCompany from './components/recruiter/EditCompany'



function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/jobs' element={<FindJobs />} />
        {/* recruiter */}
        <Route path='recruiter/companies' element={<Companies/>}/>
        <Route path='/recruiter/companies/create' element={<CreateCompany/>}/>
        <Route path='/recruiter/jobs' element={<RecruiterJobs/>}/>
        <Route path='/recruiter/jobs/create' element={<PostJob/>}/>
        <Route path='/recruiter/companies/:id' element={<EditCompany/>}/>
      </Routes>
    </>
  )
}

export default App
