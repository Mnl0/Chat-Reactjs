import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3000');
const url = 'http://localhost:3000/api/';

function App() {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [storedMessages, setStoredMessages] = useState([]);
  const [firtTime, setFirstTime] = useState(true);

  useEffect(() => {
    const receivedMessage = (message) => {
      setMessages([message, ...messages]);
    }
    socket.on('message', receivedMessage);

    return () => {
      socket.off('message', receivedMessage);
    }
  }, [messages])

  if (!firtTime) {
    fetch(url + 'messages')
      .then(res => res.json())
      .then(data => setStoredMessages(data.messages))
    setFirstTime(true);
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    setNickname(nickname)
    setMessage(message);
    setDisabled(true);

    socket.emit('message', message, nickname);

    const newMessage = {
      body: message,
      from: 'Yo',
    }

    setMessages([newMessage, ...messages]);
    setMessage('');


    //  fetch(url + 'save', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     message: message,
    //     from: nickname
    //   })
    // })
    //usar axios para evitar demaciados fetch?

  }

  return (
    <div className="App">
      <div className="main">

        <div className="leftSide">
          <h1>lista de amigos</h1>
        </div>

        <div className="listMessage">
          <div className="list">
            {messages.map((message, index) => {
              return (
                <div key={index}>
                  <p>{message.from}</p>
                  <p>{message.body}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="formMessage">
          <input
            onChange={(e) => { setNickname(e.target.value) }}
            type="text"
            placeholder="nickname"
            id='nickname'
          />

          <input
            onChange={(e) => { setMessage(e.target.value) }}
            id='message'
            type="text"
            placeholder="message"
            value={message}
          />
          <button
            onClick={handleOnClick}
          >enviar
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
