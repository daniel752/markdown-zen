import axios from 'axios';

const customRequest = axios.create
    ({
        baseURL: '/api/v1',
    });

export default customRequest;