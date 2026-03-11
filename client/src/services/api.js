import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
});

// Attach JWT to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Temples
export const getTemples = (params) => API.get('/temples', { params });
export const getTemple = (id) => API.get(`/temples/${id}`);
export const createTemple = (data) => API.post('/temples', data);
export const updateTemple = (id, data) => API.put(`/temples/${id}`, data);
export const deleteTemple = (id) => API.delete(`/temples/${id}`);

// Slots
export const getSlotsByTemple = (templeId, date) => API.get(`/slots/temple/${templeId}`, { params: { date } });
export const createSlot = (data) => API.post('/slots', data);
export const updateSlot = (id, data) => API.put(`/slots/${id}`, data);
export const deleteSlot = (id) => API.delete(`/slots/${id}`);

// Bookings
export const createBooking = (data) => API.post('/bookings', data);
export const getMyBookings = () => API.get('/bookings/my');
export const cancelBooking = (id) => API.put(`/bookings/${id}/cancel`);
export const getAllBookings = () => API.get('/bookings');

// Donations
export const createDonation = (data) => API.post('/donations', data);
export const getMyDonations = () => API.get('/donations/my');

export default API;
