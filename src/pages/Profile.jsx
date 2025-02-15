import React, { useEffect, useState } from 'react';
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
import { Mail, Phone } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getAppliedJobAPI } from '@/services/allAPI';



const Profile = () => {

    const [appliedJobs,setAppliedJobs] = useState([])

    const getAppliedJobs = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await getAppliedJobAPI(reqHeader)
                setAppliedJobs(result.data.application)
                console.log(result.data.application);

            } catch (error) {
                console.log(error);
            }

        }
    }
    useEffect(() => {
        getAppliedJobs()
    }, [])

    const { user } = useSelector(store => store.auth);
    // const user = JSON.parse(sessionStorage.getItem("user"));
    const skills = user?.profile.skills

    const [input, setInput] = useState({
        fullname: user?.fullname,
        bio: user?.profile?.bio,
        phoneNumber: user?.phoneNumber,
        skills: user?.profile?.skills
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        console.log(input);
    }

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
                            className="rounded-full w-36 mb-1"
                        />
                        <p className="text-lg font-medium">{user.fullname}</p>
                        <p className="text-gray-500 text-sm mb-4">{user?.profile.bio}</p>

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
                                            name="name"
                                            defaultValue={user?.fullname}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Bio
                                        </Label>
                                        <Input
                                            name="bio"
                                            defaultValue={user?.profile.bio}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Phone
                                        </Label>
                                        <Input
                                            id="phone"
                                            defaultValue={user?.phoneNumber}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid w-100 max-w-95 items-center">
                                        <div className='flex items-center ms-11 gap-2.5'>
                                            <Label htmlFor="picture">Profile</Label>
                                            <Input id="picture" type="file" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Skills
                                        </Label>
                                        <Input
                                            id="skills"
                                            defaultValue={user?.profile.skills}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid w-100 max-w-95 items-center gap-1.5">
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

                    <div className="lg:w-3/4 mt-6 p-5">
                        <div className="mb-6">
                            <div className='flex items-center gap-2 my-2'>
                                <Mail />
                                <p className="text-md">{user?.email}</p>
                            </div>
                            <div className='flex items-center gap-2 my-2'>
                                <Phone />
                                <p className="text-md">{user?.phoneNumber}</p>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mb-6">
                            <h6 className="text-lg font-semibold mb-2">Skills</h6>
                            <div className="flex flex-wrap gap-2">
                                {skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-500 text-white border px-3 py-1 rounded-full text-sm"
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
                <AppliedJobs appliedJobs = {appliedJobs} />
            </div>
        </>
    )
}

export default Profile