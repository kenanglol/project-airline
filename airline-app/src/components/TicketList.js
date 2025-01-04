import React, { useState, useEffect } from 'react';
import ticketService from '../services/ticketService';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await ticketService.getAllTickets();
      setTickets(response.data);
    } catch (error) {
      console.error('Biletler yüklenirken hata oluştu:', error);
    }
  };

  const handleCancelTicket = async (ticketId) => {
    try {
      await ticketService.cancelTicket(ticketId);
      fetchTickets();
    } catch (error) {
      console.error('Bilet iptal edilirken hata oluştu:', error);
    }
  };

  return (
    <div className="ticket-list">
      <h2>Biletlerim</h2>
      <div className="tickets-container">
        {tickets.map(ticket => (
          <div key={ticket.id} className="ticket-card">
            <h3>Bilet #{ticket.id}</h3>
            <p>Yolcu: {ticket.passengerName}</p>
            <p>Uçuş: {ticket.flightId}</p>
            <p>Koltuk: {ticket.seatNumber}</p>
            <p>Fiyat: {ticket.price} TL</p>
            <button 
              onClick={() => handleCancelTicket(ticket.id)}
              className="cancel-button"
            >
              Bileti İptal Et
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;