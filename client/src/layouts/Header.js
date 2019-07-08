import React from 'react';

import { Nav } from 'react-bootstrap';

const header = (props) => {
    const navStyle = {
        backgroundColor: 'transparent',
        fontFamily: 'Bungee Shade', 
        fontSize: '1.13rem'
        // fontFamily: 'Staatliches', for both, esp body
        // fontFamily: 'Just Another Hand', for head 
        // fontFamily: 'Nanum Pen Script', !for body combo^
        // fontFamily: 'Fredericka the Great', !
        // fontFamily: 'Cabin Sketch', 
        // fontFamily: 'Love Ya Like A Sister', !
        // fontFamily: 'Bungee Shade', !
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