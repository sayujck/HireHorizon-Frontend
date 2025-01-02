import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import FindJobs from './pages/FindJobs'
import Employers from './pages/Employers'


function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister={true}/>}/>
      <Route path='/jobs' element={<FindJobs/>}/>
      <Route path='/employers' element={<Employers/>}/>
     </Routes>
    </>
  )
}

export default App
