import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <h1>Modern Banking App</h1>
                <Navigation />
            </header>
            <main className="content">
                <div className="card">
                    {children}
                </div>
            </main>
            <footer className="app-footer">
                <p>© 2025 Modern Banking App. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Layout;