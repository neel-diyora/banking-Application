import React, { useState } from 'react';
import accountService from '../api/accountService';
import ResponseMessage from '../components/ResponseMessage';

const TransferPage = () => {
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await accountService.transfer(fromAccount, toAccount, amount);
            setMessage('Transfer successful!');
            setFromAccount('');
            setToAccount('');
            setAmount('');
        } catch (err) {
            setError(err.response?.data || 'Transfer failed. Check details.');
        }
    };

    return (
        <div>
            <h2>Make a Transfer</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} placeholder="From Account Number" required />
                <input type="text" value={toAccount} onChange={(e) => setToAccount(e.target.value)} placeholder="To Account Number" required />
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
                <button type="submit">Transfer</button>
            </form>
            <ResponseMessage message={error} type="error" />
            <ResponseMessage message={message} type="success" />
        </div>
    );
};

export default TransferPage;