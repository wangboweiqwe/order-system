import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchPost } from '../../utils/fetchPromise';

function Login(){
  const [name, setName] = useState('');
  const [password, setPass] = useState('');
  const history = useHistory();

  const changeName = (event:{
    target: {
      value: string
    }
  }) => {
    setName(event.target.value);
  };

  const changePass = (event:{
    target: {
      value: string
    }
  }) => {
    setPass(event.target.value);
  };

  const submit = () => {
    const data = {
      name,
      hashedPassword: password
    }
    fetchPost('/api/auth/login', data).then((res: {
      code: number
    }) => {
      if(res.code === 0){
        history.push('/');
      }
    })
  }

  return(
    <div>
      <label htmlFor='name'>Name:
      </label>
      <input id='name' onChange={changeName} value={name} />
      <br />
      <label htmlFor='password'>Password:
      </label>
      <input id='password' type="password" onChange={changePass} value={password} />
      <br />
      <input type="button" value="提交" onClick={submit} />
    </div>
  );
}

export default Login;