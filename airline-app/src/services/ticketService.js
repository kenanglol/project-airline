import axios from 'axios';
import authService from './authService';

const BASE_URL = 'http://localhost:8080/api/tickets';

const ticketService = {
  getAllTickets: () => {
    return axios.get(BASE_URL, { headers: authService.authHeader() });
  },

  getTicketById: (ticketId) => {
    return axios.get(`${BASE_URL}/${ticketId}`, { headers: authService.authHeader() });
  },

  createTicket: (ticketData) => {
    return axios.post(BASE_URL, ticketData, { headers: authService.authHeader() });
  },

  updateTicket: (ticketId, ticketData) => {
    return axios.put(`${BASE_URL}/${ticketId}`, ticketData, { headers: authService.authHeader() });
  },

  cancelTicket: (ticketId) => {
    return axios.delete(`${BASE_URL}/${ticketId}`, { headers: authService.authHeader() });
  }
};

export default ticketService; 