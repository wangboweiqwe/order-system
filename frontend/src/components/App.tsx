import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  let [user, setUser] = useState('')
  useEffect(() => {
    fetch('/users', {credentials: 'include'}).then((data) => {
      return data.json();
    }).then((res) => {
      setUser(res.msg);
    })
  }, [user])
  return (
    <div className="App">
      <header className="App-header">
        <div>{user}</div>
      </header>
    </div>
  );
}

export default App;
