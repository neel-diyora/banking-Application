import React, { useState } from 'react';
import accountService from '../api/accountService';
import AccountDetails from '../components/AccountDetails';
import ResponseMessage from '../components/ResponseMessage';

const CreateAccountPage = () => {
    const [name, setName] = useState('');
    const [deposit, setDeposit] = useState('');
    const [account, setAccount] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setAccount(null);
        if (parseFloat(deposit) < 1000) {
            setError('Initial deposit must be at least 1000.');
            return;
        }
        try {
            const response = await accountService.createAccount(name, deposit);
            setAccount(response.data);
            setName('');
            setDeposit('');
        } catch (err) {
            setError('Failed to create account. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create New Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Account Holder Name" required />
                <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} placeholder="Initial Deposit (min. 1000)" required />
                <button type="submit">Create Account</button>
            </form>
            <ResponseMessage message={error} type="error" />
            <AccountDetails title="Account Created Successfully!" account={account} />
        </div>
    );
};

export default CreateAccountPage;