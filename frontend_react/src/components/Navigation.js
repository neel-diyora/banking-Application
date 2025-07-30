import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/create-account">Create Account</NavLink></li>
                <li><NavLink to="/deposit">Deposit</NavLink></li>
                <li><NavLink to="/withdraw">Withdraw</NavLink></li>
                <li><NavLink to="/transfer">Transfer</NavLink></li>
                <li><NavLink to="/balance">Check Balance</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navigation;