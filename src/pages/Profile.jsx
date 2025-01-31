import React, { useState } from 'react';
import Header from '../components/Header';
import AppliedJobs from '../components/AppliedJobs';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



const Profile = () => {
    const userDetails = JSON.parse(sessionStorage.getItem("user"));
    const skills = userDetails.profile.skills


    return (
        <>
            <Header />
            {/* Profile Section */}
            <div className="container mx-5">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/4 p-5 flex flex-col items-center">
                        <img
                            src="https://i.pinimg.com/736x/b1/33/4f/b1334f43d458b7a3794cd239928370c7.jpg"
                            alt="avatar"
                            className="rounded-full w-36 mb-4"
                        />
                        <p className="text-lg font-medium mb-1">{userDetails.fullname}</p>
                        <p className="text-gray-500 text-sm mb-4">{userDetails.profile.bio}</p>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition" variant="outline">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Bio
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Phone
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Password
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Skills
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid w-100 max-w-70 items-center gap-1.5">
                                        <div className='flex items-center ms-8 gap-2.5'>
                                            <Label htmlFor="picture">Resume</Label>
                                            <Input id="picture" type="file" />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button className='bg-black text-white' type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Information Section */}
                    <div className="lg:w-3/4 mt-6 p-5">
                        {/* Contact Details */}
                        <div className="mb-6">
                            <p className="text-md">Email: {userDetails.email}</p>
                            <p className="text-md">Phone: {userDetails.phoneNumber}</p>
                        </div>

                        {/* Skills Section */}
                        <div className="mb-6">
                            <h6 className="text-lg font-semibold mb-2">Skills</h6>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div>
                            <h6 className="text-lg font-semibold mb-2">Resume</h6>
                            <a href="#" className="text-blue-600 underline hover:text-blue-800">
                                Resume.pdf
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Applied Jobs */}
            <div className="container m-5 px-5">
                <h4 className='text-2xl font-semibold mb-4'>Applied Jobs</h4>
                <AppliedJobs />
            </div>
        </>
    )
}

export default Profile