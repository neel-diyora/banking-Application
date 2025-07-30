import React, { useState } from 'react';
import accountService from '../api/accountService';
import ResponseMessage from '../components/ResponseMessage';

const DepositPage = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await accountService.deposit(accountNumber, amount);
            setMessage(`Deposit successful! New balance is: ₹${response.data.balance.toFixed(2)}`);
            setAccountNumber('');
            setAmount('');
        } catch (err) {
            setError('Deposit failed. Check account number.');
        }
    };

    return (
        <div>
            <h2>Deposit Funds</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account Number" required />
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
                <button type="submit">Deposit</button>
            </form>
            <ResponseMessage message={error} type="error" />
            <ResponseMessage message={message} type="success" />
        </div>
    );
};

export default DepositPage;