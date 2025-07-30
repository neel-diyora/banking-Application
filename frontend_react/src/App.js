import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreateAccountPage from './pages/CreateAccountPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TransferPage from './pages/TransferPage';
import CheckBalancePage from './pages/CheckBalancePage';
import './App.css';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                    <Route path="/deposit" element={<DepositPage />} />
                    <Route path="/withdraw" element={<WithdrawPage />} />
                    <Route path="/transfer" element={<TransferPage />} />
                    <Route path="/balance" element={<CheckBalancePage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;