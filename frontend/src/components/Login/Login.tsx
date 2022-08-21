import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPost } from '../../utils/fetchPromise';

function Login(){
  const [name, setName] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate();
  const changeName = (event:{
    target: {
      value: string
    }
  }) => {
    setName(event.target.value);
  }
  const changePass = (event:{
    target: {
      value: string
    }
  }) => {
    setPass(event.target.value);
  }
  const submit = () => {
    const data = {
      name,
      hashedPassword: password
    }
    fetchPost('/api/auth/login', data).then((res: {
      code: number
    }) => {
      if(res.code === 0){
        navigate('/');
      }
    })
  }
  return(
    <div>
      <form action="/auth/login" method='post'>
        <label>Name:
          <input onChange={changeName} value={name} />
        </label><br />
        <label>Password:
          <input type="password" onChange={changePass} value={password} />
        </label><br />
        <input type="button" value="提交" onClick={submit} />
      </form>
    </div>
  );
}

export default Login;