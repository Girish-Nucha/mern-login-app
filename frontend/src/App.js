import { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = () => {
    axios.post('http://localhost:5000/login', { username, password })
      .then(res => setMessage(res.data.message));
  };

  const register = () => {
    axios.post('http://localhost:5000/register', { username, password })
      .then(res => setMessage(res.data.message));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login Page</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
      <p>{message}</p>
    </div>
  );
}

export default App;