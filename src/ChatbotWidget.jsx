import React, { useState } from 'react';

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // --- Start of Updated Section ---
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to state immediately
    setMessages(prevMessages => [...prevMessages, { from: 'user', text: input }]);
    
    const userMessageText = input; // Store input before clearing
    setInput(''); // Clear input field

    // Use the environment variable for the API URL
    const apiUrl = `${import.meta.env.VITE_CHATBOT_API_URL}/chat`;

    try {
      const res = await fetch(apiUrl, { // Use the new apiUrl variable
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessageText }), // Use stored input
      });
      const data = await res.json();
      
      // Add bot response to state
      setMessages(prevMessages => [...prevMessages, { from: 'bot', text: data.response }]);
    } catch (error) {
      console.error("Failed to fetch chatbot response:", error);
      // Optionally, show an error message in the chat
      setMessages(prevMessages => [...prevMessages, { from: 'bot', text: "Sorry, I'm having trouble connecting." }]);
    }
  };
  // --- End of Updated Section ---

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        {/* Chatbot symbol (simple circle with chat icon) */}
        <span style={{
          background: '#007bff',
          color: '#fff',
          borderRadius: '50%',
          padding: '15px',
          fontSize: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          💬
        </span>
      </div>
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 80,
            right: 30,
            width: 300,
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            padding: 10,
            zIndex: 1001,
          }}
        >
          <div style={{ maxHeight: 250, overflowY: 'auto', marginBottom: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                <span style={{
                  display: 'inline-block',
                  background: msg.from === 'user' ? '#e1ffc7' : '#f1f1f1',
                  padding: '6px 12px',
                  borderRadius: 8,
                  margin: '2px 0'
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ flex: 1, borderRadius: 6, border: '1px solid #ccc', padding: 6 }}
              placeholder="Type your message..."
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: 6,
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatbotWidget;