import { useState } from 'react';
import AppliedJobs from '../components/candidate/AppliedJobs';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Phone } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAPI } from '@/services/allAPI';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import { Loader2 } from "lucide-react"

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
        console.log(input);
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
            console.log(formData);

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
            <div className="container mx-5">
                <div className="flex flex-col lg:flex-row">

                    <div className="lg:w-1/4 ms-10 p-5 flex flex-col items-start">
                        <img width={'100px'} height={'100px'}
                            src={user.profile.profilePic ? user.profile.profilePic : "https://i.pinimg.com/736x/b1/33/4f/b1334f43d458b7a3794cd239928370c7.jpg"}
                            alt="avatar"
                            className="rounded-full  w-25 h-25 mb-1"
                        />
                        <p className="text-lg font-medium ">{user?.fullname}</p>
                        <p className="text-gray-500 text-sm mb-4">{user?.profile.bio}</p>

                        <Dialog open={open} onOpenChange={setOpen}>
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
                                <div className="grid gap-4 py-4 ">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            name="fullname"
                                            defaultValue={user?.fullname}
                                            className="col-span-3 "
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Email
                                        </Label>
                                        <Input
                                            name="email"
                                            defaultValue={user?.email}
                                            className="col-span-3 "
                                            onChange={changeEventHandler}
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Bio
                                        </Label>
                                        <Input
                                            name="bio"
                                            defaultValue={user?.profile.bio}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Phone
                                        </Label>
                                        <Input
                                            name="phoneNumber"
                                            defaultValue={user?.phoneNumber}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid w-100 max-w-95 items-center">
                                        <div className='flex items-center ms-11 gap-2.5'>
                                            <Label htmlFor="picture">Profile</Label>
                                            <Input
                                                id="picture"
                                                type="file"
                                                name="profilePic"
                                                accept="image/png, image/jpg, image/jpeg"
                                                onChange={fileChangeHandler}
                                            />
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Skills
                                        </Label>
                                        <Input
                                            name="skills"
                                            defaultValue={skills}
                                            className="col-span-3"
                                            onChange={changeEventHandler}
                                        />
                                    </div>
                                    <div className="grid w-100 max-w-95 items-center gap-1.5">
                                        <div className='flex items-center ms-8 gap-2.5'>
                                            <Label htmlFor="resume">Resume</Label>
                                            <Input
                                                id="resume"
                                                type="file"
                                                name="resume"
                                                accept="application/pdf" // Restrict file type to PDF
                                                onChange={fileChangeHandler}
                                            />
                                        </div>

                                    </div>
                                </div>
                                <DialogFooter>
                                    {
                                        isLoading ?
                                            <Button disabled>
                                                <Loader2 className="animate-spin" />
                                                Updating
                                            </Button>
                                            :
                                            <Button onClick={updateProfile} className='bg-black text-white' type="submit">
                                                Save changes
                                            </Button>
                                    }

                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="lg:w-3/4 m-4 p-5">
                        <div className="mb-6">
                            <div className='flex items-center gap-2 my-2'>
                                <Mail />
                                <p className="text-md">{user?.email}</p>
                            </div>
                            <div className='flex items-center gap-2 my-2'>
                                <Phone />
                                <p className="text-md">{user?.phoneNumber}</p>
                            </div>
                            <div className="mb-6">
                                <h6 className="text-lg font-semibold mb-2">Skills</h6>
                                <div className="flex flex-wrap gap-2 w-[60%]">
                                    {skillsArray?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-500 text-white border px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

            {/* Applied Jobs */}
            {
                user?.userType === "candidate" &&
                <div className="container m-5 px-5">
                    <AppliedJobs />
                </div>
            }
        </>
    )
}

export default Profile