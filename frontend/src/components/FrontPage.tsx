import React, { createContext, useEffect, useState } from 'react';
import { Outlet, Route, useNavigate } from 'react-router-dom'
import './front-page.scss';
import { User, Response, fetchGet } from '../utils/fetchPromise';
import OrderList from './OrderList/OrderList';

export const UserContext = createContext<undefined | User>(undefined);

function App() {
  let [user, setUser] = useState<undefined | User>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    fetchGet('/api/users/self').then((res: Response) => {
      if(res.code === 0){
        setUser(res.user);
        if(res.user && res.user.role === 0){
          navigate('/order-list', { replace: true });
        }else if(res.user && res.user.role === 1){
          navigate('/add-order', { replace: true });
        }
      }
    })
  }, [])
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <header className="App-header">
          <Outlet />
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
