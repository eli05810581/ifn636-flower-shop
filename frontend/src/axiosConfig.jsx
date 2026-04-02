import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5001', // local
  baseURL: 'http://52.63.234.111:5001', // live (YOUR EC2 IP)
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;