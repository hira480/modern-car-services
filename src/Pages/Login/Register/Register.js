import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile, } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './Register.css';
import SocialLogin from '../SocialLogin/SocialLogin';
import { async } from '@firebase/util';
import Loading from '../../../Shared/Loading/Loading';
import useToken from '../../../hooks/useToken';

const Register = () => {
    const [agree, setAgree] = useState(false);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user);

    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    }

    if (loading || updating) {
        return <Loading></Loading>
    }

    if (token) {
        navigate('/home');
    }

    const handelRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.terms.checked;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        console.log('Updated profile');

    }

    return (
        <div className='register-form'>
            <h2 className='text-primary' style={{ textAlign: 'center' }}>Please Register</h2>
            <form onSubmit={handelRegister}>
                <input type="text" name="name" placeholder='Your Name' />
                <input type="email" name="email" id="regEmail" placeholder='Your Email' required />
                <input type="password" name="password" id="regPassword" placeholder='Password' required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />

                {/* <label className={agree ? 'ps-2 text-primary' : 'ps-2 text-danger'} htmlFor="terms">Accept Modern Car Terms and Conditions</label> */}

                <label className={`ps-2 ${agree ? '' : 'text-danger'}`} htmlFor="terms">Accept Modern Car Terms and Conditions</label>
                <input disabled={!agree} className='w-50 mx-auto btn btn-primary mt-2' type="submit" value="Register" />
            </form>
            <p>Already Have an Account? <Link to='/login' className='text-primary pe-auto text-decoration-none' onClick={navigateLogin}>Please Login</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;