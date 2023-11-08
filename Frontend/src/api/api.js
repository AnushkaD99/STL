import axios from 'axios';

const AUTH_SERVICE = 'http://localhost:5000/api/v1';
const BILLING_SERVICE = 'http://localhost:5001/api/v1';
const DATASET_SERVICE = 'http://localhost:5002/api/v1';

const auth_api = axios.create({
  baseURL: AUTH_SERVICE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const billing_api = axios.create({
  baseURL: BILLING_SERVICE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const dataset_api = axios.create({
  baseURL: DATASET_SERVICE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (userData) => auth_api.post('/login', userData);
export const signup = (userData) => auth_api.post('/signup', userData);

export const uploadDataset = (formData) => dataset_api.post('/datasets/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const searchDatasets = (searchTerm) => dataset_api.get(`/datasets/search?term=${searchTerm}`);
export const downloadDataset = (datasetId) => dataset_api.get(`/datasets/download/${datasetId}`, {
  responseType: 'blob', // Specify response type as blob for file download
});



export const getDatasets = () => getDatasets.get('/datasets');

