import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Spring Boot backend URL

const createAccount = (accountHolderName, balance) => {
    return axios.post(`${API_URL}/accounts`, { accountHolderName, balance });
};

const deposit = (accountNumber, amount) => {
    return axios.post(`${API_URL}/accounts/${accountNumber}/deposit`, { amount });
};

const withdraw = (accountNumber, amount) => {
    return axios.post(`${API_URL}/accounts/${accountNumber}/withdraw`, { amount });
};

const getBalance = (accountNumber) => {
    return axios.get(`${API_URL}/accounts/${accountNumber}/balance`);
};

const transfer = (fromAccountNumber, toAccountNumber, amount) => {
    return axios.post(`${API_URL}/transfers`, { fromAccountNumber, toAccountNumber, amount });
};

const accountService = {
    createAccount,
    deposit,
    withdraw,
    getBalance,
    transfer,
};

export default accountService;