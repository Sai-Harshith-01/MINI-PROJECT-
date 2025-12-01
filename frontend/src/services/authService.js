import api from './api';

export const authService = {
 registerStudent: async (email, password) => {
  const response = await api.post('/auth/register/student', { email, password });
  return response.data;
 },

 registerCollege: async (email, website, password) => {
  const response = await api.post('/auth/register/college', { email, website, password });
  return response.data;
 },

 login: async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { access_token, role } = response.data;

  localStorage.setItem('token', access_token);
  localStorage.setItem('role', role);

  return { token: access_token, role };
 },

 logout: () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
 },

 getRole: () => localStorage.getItem('role'),

 isAuthenticated: () => !!localStorage.getItem('token'),
};

export default authService;
