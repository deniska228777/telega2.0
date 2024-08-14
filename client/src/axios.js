import axios from 'axios';

const basic = axios.create({
    baseURL: 'http://localhost:6556',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    signal: AbortSignal.timeout(500)
});

export default basic;