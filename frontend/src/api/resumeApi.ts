import axios from 'axios';
import type { ResumeData } from '../types/resume';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const createResume = async (data: ResumeData) => {
  const res = await API.post('/resumes', data);
  return res.data;
};

export const getResumeById = async (id: string) => {
  const res = await API.get(`/resumes/${id}`);
  return res.data;
};

export const updateResume = async (id: string, data: ResumeData) => {
  const res = await API.put(`/resumes/${id}`, data);
  return res.data;
};

export const deleteResume = async (id: string) => {
  const res = await API.delete(`/resumes/${id}`);
  return res.data;
};

export const getAllResumes = async () => {
  const res = await API.get('/resumes');
  return res.data;
};

export const downloadResume = async (id: string) => {
  const res = await axios.post(`/api/resumes/${id}/download`);
  return res.data;
};