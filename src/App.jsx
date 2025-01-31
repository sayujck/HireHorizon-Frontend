import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import FindJobs from './pages/FindJobs'
import Profile from './pages/Profile'
import PostJob from './pages/PostJob'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/jobs' element={<FindJobs />} />
        <Route path='/postjob' element={<PostJob />} />
      </Routes>
    </>
  )
}

export default App
