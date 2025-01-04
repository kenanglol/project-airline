import React, { useState } from 'react';
import ticketService from '../services/ticketService';

const TicketForm = ({ ticket, onSubmit }) => {
  const [formData, setFormData] = useState({
    passengerName: ticket?.passengerName || '',
    flightId: ticket?.flightId || '',
    seatNumber: ticket?.seatNumber || '',
    price: ticket?.price || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ticket) {
        await ticketService.updateTicket(ticket.id, formData);
      } else {
        await ticketService.createTicket(formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Bilet işlemi başarısız:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div className="form-group">
        <label>Yolcu Adı:</label>
        <input
          type="text"
          name="passengerName"
          value={formData.passengerName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Uçuş ID:</label>
        <input
          type="text"
          name="flightId"
          value={formData.flightId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Koltuk Numarası:</label>
        <input
          type="text"
          name="seatNumber"
          value={formData.seatNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Fiyat:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">
        {ticket ? 'Bileti Güncelle' : 'Bilet Oluştur'}
      </button>
    </form>
  );
};

export default TicketForm;