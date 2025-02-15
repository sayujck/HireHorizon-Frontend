import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { persistStore } from "redux-persist";
import store from '@/redux/store';



const Header = () => {

  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const persistor = persistStore(store);
  const logout = () => {
    persistor.purge();
    sessionStorage.clear()
    window.location.reload();
    navigate('/')
  }
  


  return (

    <Navbar className="p-2 flex justify-between items-center">
      <Link to={'/'} className='text-decoration-none text-black text-2xl font-bold ms-4'>HireHorizon</Link>
      <div className='p-2 text-lg font-semibold'>

        {
          user?.userType == 'recruiter' ?
            <>
              <Link to={'/recruiter/jobs'} className='text-decoration-none me-8 text-black'>Jobs</Link>
              <Link to={'/recruiter/companies'} className='text-decoration-none me-8 text-black'>Companies</Link>
              <Link className='text-decoration-none me-8 text-black'>About Us</Link>
              <Link className='text-decoration-none text-black'>Contact Us</Link>
            </>
            :
            <>
              <Link to={'/'} className='text-decoration-none me-8 text-black'>Home</Link>
              <Link to={'/jobs'} className='text-decoration-none me-8 text-black'>Find Job</Link>
              <Link className='text-decoration-none me-8 text-black'>About Us</Link>
              <Link className='text-decoration-none text-black'>Contact Us</Link>
            </>

        }
      </div>

      {
        !user ?
          <div className='p-1'>
            <Link to={'/login'}><Button variant='outline' className='text-black border-1  hover:bg-gray-100 me-3'>Login</Button></Link>
            <Link to={'/register'}><Button variant='outline' className='bg-purple-700 text-white  hover:bg-purple-800'>Signup</Button></Link>
          </div>
          :
          <div className='p-1'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 me-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <Link to={'/profile'}>Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogOut />
                  <button onClick={logout}>Log out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      }
    </Navbar>
  )
}

export default Header