import React, { createContext, useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
import './front-page.scss';
import { User, Response, fetchGet } from '../utils/fetchPromise';
import OrderList from './OrderList/OrderList';
import AddOrder
  from './AddOrder/AddOrder';
import Login from './Login/Login';
export const UserContext = createContext<undefined | User>(undefined);

function App() {
  let [user, setUser] = useState<undefined | User>(undefined);
  const history = useHistory();
  useEffect(() => {
    fetchGet('/api/users/self').then((res: Response) => {
      if (res.code === 0) {
        setUser(res.user);
        if (res.user && res.user.role === 0) {
          history.push('/order-list', { replace: true });
        } else if (res.user && res.user.role === 1) {
          history.push('/add-order', { replace: true });
        }
      } else {
        history.push('/login');
      }
    })
  }, [])
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <header className="App-header">
          湖北嘉合食品有限责任公司
        </header>
        <Switch>
          <Route path='/order-list'><OrderList /></Route>
          <Route path='/add-order'><AddOrder /></Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
