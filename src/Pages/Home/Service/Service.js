import React from 'react';

const Service = ({ service }) => {
    const { name, price, description, img } = service;
    return (
        <div>
            <img src={img} alt="" />
            <h2>{name}</h2>
        </div>
    );
};

export default Service;