import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Header = () => {

  const { user } = useSelector(store => store.auth)


  return (

    <Navbar className="p-2 flex justify-between items-center">
      <Link to={'/'} className='text-decoration-none text-black text-2xl font-bold ms-4'>HireHorizon</Link>
      <div className='p-2 text-lg font-semibold'>
        <Link to={'/'} className='text-decoration-none me-8 text-black'>Home</Link>
        <Link to={'/jobs'} className='text-decoration-none me-8 text-black'>Find Job</Link>
        <Link to={'/postjob'} className='text-decoration-none me-8 text-black'>Post Job</Link>
        <Link className='text-decoration-none me-8 text-black'>About Us</Link>
        <Link className='text-decoration-none text-black'>Contact Us</Link>
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
                    <span>Profile</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      }
    </Navbar>
  )
}

export default Header