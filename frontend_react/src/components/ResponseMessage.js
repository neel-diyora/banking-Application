import React from 'react';

const ResponseMessage = ({ message, type }) => {
    if (!message) return null;

    return (
        <div className={`response-message ${type}`}>
            {message}
        </div>
    );
};

export default ResponseMessage;