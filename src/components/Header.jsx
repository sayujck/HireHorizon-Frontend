import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Menu, X, User, LogOut } from "lucide-react";
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
import { toast } from 'sonner';


const Header = () => {

  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const persistor = persistStore(store);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    persistor.purge();
    navigate("/");
    window.location.reload();
    sessionStorage.clear();
  }


  return (

    <nav className="px-4 py-3 flex justify-between items-center bg-white shadow-md relative">

      {/* Logo */}
      {
        user?.userType === "recruiter" ? <Link className="text-2xl font-bold text-black">HireHorizon</Link> : <Link to={"/"} className="text-2xl font-bold text-black">HireHorizon</Link>
      }

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
        {user?.userType === "recruiter" ? (
          <>
            <Link to="/recruiter/companies" className="text-black hover:text-gray-700">Companies</Link>
            <Link to="/recruiter/jobs" className="text-black hover:text-gray-700">Jobs</Link>
          </>
        ) : (
          <>
            <Link to="/" className="text-black hover:text-gray-700">Home</Link>
            <Button
              onClick={() => {
                user ? navigate("/jobs") : toast.error("Please login to view jobs");
              }}
              className="bg-transparent text-black text-md font-semibold hover:text-gray-700 px-0 shadow-none focus:ring-0"
            >
              Find Job
            </Button>
          </>
        )}
        <Link className="text-black hover:text-gray-700">About Us</Link>
        <Link className="text-black hover:text-gray-700">Contact Us</Link>
      </div>

      {/* Profile */}
      <div className="hidden md:block">
        {!user ? (
          <>
            <Link to="/login">
              <Button variant="outline" className="text-black border hover:bg-gray-100 me-3">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-700 text-white hover:bg-purple-800">Signup</Button>
            </Link>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user.profile.profilePic ? user.profile.profilePic : "https://i.pinimg.com/736x/b1/33/4f/b1334f43d458b7a3794cd239928370c7.jpg"} alt="User Avatar" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut />
                <button onClick={logout}>Log out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button
        className="md:hidden p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden">
          {user?.userType === "recruiter" ? (
            <>
              <Link to="/recruiter/jobs" className="text-black">Jobs</Link>
              <Link to="/recruiter/companies" className="text-black">Companies</Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-black">Home</Link>
              <Link>
                <Button
                  onClick={() => {
                    user ? navigate("/jobs") : toast.error("Please login to view jobs");
                  }}
                  className="text-md font-normal p-0"
                >
                  Find Job
                </Button>
              </Link>
            </>
          )}
          <Link className="text-black">About Us</Link>
          <Link className="text-black">Contact Us</Link>

          {!user ? (
            <div className="flex flex-col space-y-2">
              <Link to="/login">
                <Button variant="outline" className="text-black border hover:bg-gray-100">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-purple-700 text-white hover:bg-purple-800">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user.profile.profilePic ? user.profile.profilePic : "https://github.com/shadcn.png"} alt="User Avatar" />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                      <LogOut />
                      <button onClick={logout}>Log out</button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      )}

    </nav>
  )
}

export default Header