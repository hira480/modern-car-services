import React, { useRef } from 'react';
import './Login.css';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
// import { async } from '@firebase/util';
import Loading from '../../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitel from '../../../Shared/PageTitel/PageTitel';
import axios from 'axios';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation()

    let from = location.state?.from?.pathname || "/";
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading || sending) {
        return <Loading></Loading>
    }

    if (user) {
        // navigate(from, { replace: true });
    }
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }
    const handelSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);
        const { data } = await axios.post('http://localhost:5000/login', { email });
        localStorage.setItem('accessToken', data.accessToken);
        navigate(from, { replace: true });
    }

    const navigateRegister = event => {
        navigate('/register');
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent Email');
        }
        else {
            toast('Please enter your Email Address');
        }
    }

    return (
        <div className='container w-50 mx-auto login-form'>
            <PageTitel titel='Login'></PageTitel>
            <h2 className='text-center text-primary mt-3'>Please Login</h2>
            <Form onSubmit={handelSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button className='w-50 mx-auto d-block mb-2' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            {errorElement}
            <p>New to Modern Car? <Link to='/register' className='text-primary pe-auto text-decoration-none' onClick={navigateRegister}>Please Register</Link></p>
            <p>Forget Password? <button className='text-primary pe-auto btn btn-link' onClick={resetPassword}>Reset Password</button></p>
            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Login;