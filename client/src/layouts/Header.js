import React from 'react';

import { Nav } from 'react-bootstrap';

const header = (props) => {
    const navStyle = {
        backgroundColor: 'transparent',
        fontFamily: 'Bungee Shade', 
        fontSize: '1.13rem'
    };

    return (
        <Nav className="justify-content-center" style={navStyle} activeKey="#">
            <Nav.Item>
                What Should I Eat?
            </Nav.Item>
        </Nav>
    );
}

export default header;