import React from 'react';

const AccountDetails = ({ title, account }) => {
    if (!account) return null;

    return (
        <div className="account-details">
            <h3>{title}</h3>
            <p><strong>Account Holder:</strong> {account.accountHolderName}</p>
            <p><strong>Account Number:</strong> {account.accountNumber}</p>
            <p><strong>Balance:</strong> ₹{parseFloat(account.balance).toFixed(2)}</p>
        </div>
    );
};

export default AccountDetails;