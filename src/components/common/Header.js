import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './Header.css';
import Logo from './logo.png';

const Header = () => {
    return (
        <div className="Header">
            <Link to="/">
                <img src={Logo} alt="logo" className="Header-logo"/>
            </Link>

            <Search />
        </div>
    );
}

export default Header;