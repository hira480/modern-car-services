import React from 'react';
import PageTitel from '../../../Shared/PageTitel/PageTitel';
import Banner from '../Banner/Banner';
import Experts from '../Experts/Experts';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <PageTitel titel='Home'></PageTitel>
            <Banner></Banner>
            <Services></Services>
            <Experts></Experts>
        </div>
    );
};

export default Home;