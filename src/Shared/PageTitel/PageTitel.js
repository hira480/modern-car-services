import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitel = ({ titel }) => {
    return (
        <Helmet>
            <title>{titel} - Modern Car Service</title>
        </Helmet>
    );
};

export default PageTitel;