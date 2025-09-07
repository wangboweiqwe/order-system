import React, { createContext, useContext, useState,
  // useEffect
} from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { fetchPost, Goods } from '../../utils/fetchPromise';
import { UserContext } from '../FrontPage';
import './add-order.scss';
import SubingDetail from '../GoodsDetail/SubingDetail';
import XhsbDetail from '../GoodsDetail/XhsbDetail';

export const AddShopping = createContext({
  addShopping: (goods: Goods) => { }
})

export default function AddOrder() {
  // let [type, setType] = useState('subing');
  let [orders, setOrders] = useState<Goods[]>([]);
  const user = useContext(UserContext);

  // function changeType(str: string) {
  //   setType(str);
  // }
  function addShopping(goods: Goods) {
    console.log(goods)
    const find = orders.findIndex((ele) =>
      ele.type === goods.type
    )
    if (find !== -1) {
      orders[find].amount += goods.amount;
    } else {
      orders.push(goods);
    }
  };

  function submit() {
    const user1 = user && user._id;
    const data = {
      goods: orders,
      user: user1
    };
    if (orders.length) {
      fetchPost('/api/orders/add', data).then(res => {
        if (res.code === 0) {
          setOrders([]);
          alert('提交订单成功');
        }
      });
    } else {
      alert('请添加订单');
    }
  }
  return (
    <div>
      <div className='add-order'>
        <div className='nav'>
          <NavLink exact to='/add-order'>
            <img src="/images/subing.png" alt="subing" />
            <div>
              酥饼
            </div>
          </NavLink>
          <NavLink to='/add-order/xhsb'>
            <img src="/images/xhsb.png" alt="xhsb" />
            <div>雪花酥饼</div>
          </NavLink>
        </div>
        <AddShopping.Provider value={{
          addShopping
        }}>
          <Switch>
            <Route path='/add-order/xhsb'>
              <XhsbDetail />
            </Route>
            <Route path='/add-order'>
              <SubingDetail />
            </Route>
          </Switch>
        </AddShopping.Provider>
      </div>
      <button onClick={submit}>提交</button>
    </div>
  )
}