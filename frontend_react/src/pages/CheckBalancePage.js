import React, { useState } from 'react';
import accountService from '../api/accountService';
import ResponseMessage from '../components/ResponseMessage';

const CheckBalancePage = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBalance(null);
        setError('');
        try {
            const response = await accountService.getBalance(accountNumber);
            setBalance(response.data);
        } catch (err) {
            setError('Account not found.');
        }
    };

    return (
        <div>
            <h2>Check Account Balance</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account Number" required />
                <button type="submit">Check Balance</button>
            </form>
            <ResponseMessage message={error} type="error" />
            {balance !== null && (
                <div className="balance-display">
                    <h3>Current Balance: ₹{balance.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
};

export default CheckBalancePage;