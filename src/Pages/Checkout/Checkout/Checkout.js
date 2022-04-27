import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    const handelPlaceOrder = event => {
        event.preventDefault();
        const order = {
            name: user.displayName,
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-center mt-3'>Please Order: {service.name}</h2>
            <form onSubmit={handelPlaceOrder} className='mt-3'>
                <input className='w-100 mb-2' type="text" value={user.displayName} name='name' placeholder='Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="email" value={user.email} name='email' placeholder='Email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name='service' placeholder='Service' required />
                <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='Address' autoComplete='off' required />
                <br />
                <input className='w-100 mb-2' type="text" name='phone' placeholder='Phone' required />
                <br />
                <input className='btn btn-primary w-100' type="submit" value="Place An Order" />
            </form>
        </div>
    );
};

export default Checkout;