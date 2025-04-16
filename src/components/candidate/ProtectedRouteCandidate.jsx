import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRouteCandidate = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user &&  user.userType == 'recruiter') {
            navigate('recruiter/jobs')
        }
        else if (user === null) {
            navigate('/')
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRouteCandidate