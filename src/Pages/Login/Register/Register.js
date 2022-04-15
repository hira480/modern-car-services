import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './Register.css';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    }
    if (user) {
        navigate('/home');
    }

    const handelRegister = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(email, password);
    }

    return (
        <div className='register-form'>
            <h2 className='text-primary' style={{ textAlign: 'center' }}>Please Register</h2>
            <form onSubmit={handelRegister}>
                <input type="text" name="name" placeholder='Your Name' />
                <input type="email" name="email" id="regEmail" placeholder='Your Email' required />
                <input type="password" name="password" id="regPassword" placeholder='Password' required />
                <input className='bg-primary text-white border-0' type="submit" value="Register" />
            </form>
            <p>Already Have an Account? <Link to='/login' className='text-danger pe-auto text-decoration-none' onClick={navigateLogin}>Please Login</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;