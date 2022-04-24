import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';



const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className='text-center mt-3'>
            <h3 className='text-danger'>Your email is not verified</h3>
            <h5 className='text-success'>Please verify your email address</h5>
            <button
                className='btn btn-primary mt-2'
                onClick={async () => {
                    await sendEmailVerification();
                    toast('Sent email');
                }}
            >
                Sent Verification Email
            </button>
            <ToastContainer />
        </div>
    }
    return children;
};

export default RequireAuth;