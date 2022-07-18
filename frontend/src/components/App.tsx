import React, { useEffect, useState } from 'react';
import './App.scss';
import { fetchPost } from '../utils/fetchPromise';

function App() {
  let [user, setUser] = useState('')
  useEffect(() => {
    const data = {
      "name": "qwe",
      "telephone": 123456781234,
      "address": "wuhan",
      hashedPassword: 'pass'
    };
    fetchPost('/auth/login', data).then((res) => {
      setUser(JSON.stringify(res));
    })
  })
  return (
    <div className="App">
      <header className="App-header">
        <div>{user}</div>
      </header>
    </div>
  );
}

export default App;
