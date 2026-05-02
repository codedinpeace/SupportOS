import axios from 'axios';

const BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE,
  withCredentials: true, // sends httpOnly cookie automatically
});

// ── Customer ──────────────────────────────────────────────────────────────────
export const customerLogin = (email, password) =>
  api.post('/auth/login', { email, password });

export const customerRegister = (fullname, email, password) =>
  api.post('/auth/register', { fullname, email, password, iscustomer: true });

export const logoutCustomer = () =>
  api.post('/auth/logout');

// ── Business (Admin) ──────────────────────────────────────────────────────────
export const businessLogin = (email, password) =>
  api.post('/business/login', { email, password });

export const businessRegister = (organization, businessEmail, businessPassword, websiteURL) =>
  api.post('/business/register', { organization, businessEmail, businessPassword, websiteURL });

export const logoutBusiness = () =>
  api.post('/business/logout');

// ── Agent ─────────────────────────────────────────────────────────────────────
export const agentLogin = (agentEmail, agentPassword) =>
  api.post('/agent/login', { agentEmail, agentPassword });

export const agentRegister = (agentFullName, agentEmail, agentPassword, invitationCode) =>
  api.post('/agent/register', { agentFullName, agentEmail, agentPassword, invitationCode });

export const logoutAgent = () =>
  api.post('/agent/logout');

// ── Shared ────────────────────────────────────────────────────────────────────
export const getMe = () =>
  api.get('/auth/me');
