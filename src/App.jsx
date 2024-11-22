import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Cards from './components/Navbar/Home.jsx';

function App() {
  const [theme, setTheme] = useState('light');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNewChat = () => {
    if (currentChat && currentChat.messages.length > 0) {
      setChatHistory([...chatHistory, currentChat]);
    }
    
    setCurrentChat({
      id: Date.now(),
      messages: [],
      title: 'New Chat'
    });
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      {/* <Cards/> */}
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} onNewChat={handleNewChat} />
      <Cards currentTheme={theme} />

    </div>
  );
}

export default App;

