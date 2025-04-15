import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompanyByIdAPI, updateCompanyByIdAPI } from '@/services/allAPI';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import toast from 'react-hot-toast';

const EditCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: companyId } = useParams();
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        logo: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCompanyDetails();
    }, []);

    const getCompanyDetails = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await getCompanyByIdAPI(companyId, reqHeader);
                if (result.status === 200) {
                    dispatch(setSingleCompany(result.data.company));
                    setInput(result.data.company);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(input).forEach((key) => {
            if (input[key]) {
                formData.append(key, input[key]);
            }
        });

        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            };
            try {
                setLoading(true);
                const res = await updateCompanyByIdAPI(formData, reqHeader, companyId);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                    toast.success(res.data.message);
                    navigate('/recruiter/companies');
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (

        <>
            <div className='ms-10 mt-5'>
                <Button
                    onClick={() => navigate('/recruiter/companies')}
                    variant="outline"
                    className="flex items-center gap-2 text-black font-semibold"
                >
                    <ArrowLeft />
                    <span>Back</span>
                </Button>
            </div>
            <div className='max-w-xl mx-auto p-5'>
                <form onSubmit={submitHandler}>
                    <h1 className="font-bold text-xl mt-5 py-5">Company Details</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input type="text" name="name" value={input.name || ''} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description || ''} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type="text" name="website" value={input.website || ''} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location || ''} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input name='logo' type="file" accept="image/*" onChange={changeFileHandler} />
                        </div>
                    </div>
                    {loading ? (
                        <Button disabled className="w-full mt-8 bg-purple-800 text-white border">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mt-8 bg-purple-700 text-white border">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </>
    );
};

export default EditCompany;
