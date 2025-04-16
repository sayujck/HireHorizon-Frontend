import { useState } from 'react';
import AppliedJobs from '../components/candidate/AppliedJobs';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAPI } from '@/services/allAPI';
import { setUser } from '@/redux/authSlice';
import { Loader2 } from "lucide-react"
import { assets } from '@/assets/assets'
import toast from 'react-hot-toast';
import { Call } from '@mui/icons-material';

const Profile = () => {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const skillsArray = user?.profile.skills
    const skills = skillsArray?.join(", ");

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        bio: user?.profile?.bio,
        phoneNumber: user?.phoneNumber,
        skills: user?.profile?.skills,
        profilePic: user?.profile?.profilePic,
        resume: user?.profile?.resume,
        resumeName: user?.profile?.resumeName,
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileChangeHandler = (e) => {
        const { name, files } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: files.length > 0 ? files[0] : prev[name],
        }));
    };

    // update profile
    const updateProfile = async () => {
        setIsLoading(true)
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
            const formData = new FormData();
            formData.append("fullname", input.fullname)
            formData.append("email", input.email)
            formData.append("bio", input.bio)
            formData.append("phoneNumber", input.phoneNumber)
            formData.append("skills", input.skills)
            if (input.profilePic && typeof input.profilePic !== "string") {
                formData.append("profilePic", input.profilePic);
            }
            if (input.resume && typeof input.resume !== "string") {
                formData.append("resume", input.resume);
            }

            try {
                const result = await updateProfileAPI(formData, reqHeader)
                if (result.status == 200) {
                    dispatch(setUser(result.data.updateUser))
                    setOpen(false)
                    toast.success(result.data.message)
                }

            } catch (error) {
                console.log(error);
                toast.error("Error updating profile")
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (

        <>
            {/* Profile Section */}
            <div className="container p-2 bg-white">
                <h1 className='text-xl font-bold text-purple-800 ms-4 mb-5 md:ms-10 md:text-2xl'>User Profile</h1>
                <div className="flex gap-3 pb-5 md:pb-10">

                    <div className="flex flex-col items-center w-1/2 md:w-1/4">
                        <img width={'120px'} height={'120px'}
                            src={user.profile.profilePic ? user.profile.profilePic : assets.profile_icon}
                            alt="avatar"
                            className="rounded-full border-2 border-gray-300"
                        />
                        <h2 className="text-xl font-semibold mt-4">{user?.fullname}</h2>
                        <p className="text-gray-600 text-sm mb-4 text-center">{user?.profile.bio}</p>

                        <Dialog open={open} onOpenChange={setOpen} >
                            <DialogTrigger asChild>
                                <Button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Update your profile information below.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4 ">
                                     <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right capitalize">Fullname</Label>
                                        <Input
                                            name="fullname"
                                            defaultValue={user?.fullname || ''}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right capitalize">Email</Label>
                                        <Input
                                            name="email"
                                            defaultValue={user?.email || ''}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right capitalize">Bio</Label>
                                        <Input
                                            name="bio"
                                            defaultValue={user?.profile?.bio || ''}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right capitalize">Phone</Label>
                                        <Input
                                            name="phoneNumber"
                                            defaultValue={ user?.phoneNumber || ''}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right capitalize">Skills</Label>
                                        <Input
                                            name="skills"
                                            defaultValue={ skills || ''}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="picture" className='text-center w-24'>Profile Picture</Label>
                                        <Input
                                            id="picture"
                                            type="file"
                                            className="w-70"
                                            name="profilePic"
                                            accept="image/png, image/jpg, image/jpeg"
                                            onChange={fileChangeHandler}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Label htmlFor="resume" className='text-right w-23'>Resume</Label>
                                        <Input
                                            id="resume"
                                            type="file"
                                            className="w-70"
                                            name="resume"
                                            accept="application/pdf"
                                            onChange={fileChangeHandler}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    {
                                        isLoading ?
                                            <Button disabled>
                                                <Loader2 className="animate-spin" />
                                                Updating...
                                            </Button>
                                            :
                                            <Button onClick={updateProfile} className='bg-purple-700 hover:bg-purple-800 text-white' type="submit">
                                                Save Changes
                                            </Button>
                                    }
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>

                    <div className="w-1/2 md:w-3/4">
                        <div className='flex items-center gap-2 my-2'>
                            <Mail className="text-gray-600" />
                            <p className="text-md">{user?.email}</p>
                        </div>
                        <div className='flex items-center gap-1 mb-5'>
                            <Call className=" text-gray-600" />
                            <p className="text-md">{user?.phoneNumber}</p>
                        </div>
                        <div className="mb-3 w-50 md:w-3/4">
                            <h6 className="text-lg font-semibold pb-2">Skills</h6>
                            <div className="flex flex-wrap gap-2">
                                {skillsArray?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-purple-700 text-white border px-2.5 py-0.5 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label className="text-lg font-semibold flex">Resume </Label>
                            {user?.profile?.resume ? (
                                <a target='_blank' href={user?.profile?.resume} className='text-blue-500 hover:underline cursor-pointer'>
                                    {user?.profile?.resumeName}
                                </a>
                            ) : (
                                <span className="text-gray-500">Not Available</span>
                            )}
                        </div>

                    </div>

                </div>
            </div>

            {/* Applied Jobs */}
            {
                user?.userType === "candidate" &&
                <div className="container px-5">
                    <AppliedJobs />
                </div>
            }
        </>
    )
}

export default Profile