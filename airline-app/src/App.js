import React, { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import Login from './components/Login';
import authService from './services/authService';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Uçak Bileti Yönetimi</h1>
        <div className="user-info">
          <span>Hoş geldiniz, {user.username}</span>
          <button onClick={handleLogout} className="logout-button">
            Çıkış Yap
          </button>
        </div>
      </header>
      <main>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="toggle-form-button"
        >
          {showForm ? 'Biletleri Göster' : 'Yeni Bilet Al'}
        </button>
        
        {showForm ? (
          <TicketForm onSubmit={() => setShowForm(false)} />
        ) : (
          <TicketList />
        )}
      </main>
    </div>
  );
}

export default App; 