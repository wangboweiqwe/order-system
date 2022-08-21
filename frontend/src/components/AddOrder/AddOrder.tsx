import React, { createContext, useContext, useState } from 'react';
import GoodsDetail from '../GoodsDetail/GoodsDetail';
import { fetchPost, Goods } from '../../utils/fetchPromise';
import { UserContext } from '../FrontPage';
import './add-order.scss';

export const AddShopping = createContext({
  addShopping: (goods:Goods) => {}
})

export default function AddOrder(){
  let [type, setType] = useState('subing');
  let [orders, setOrders] = useState<Goods[]>([]);
  const user = useContext(UserContext);

  function changeType(str:string){
    setType(str);
  }
  function addShopping(goods:Goods){
    console.log(goods)
    const find = orders.findIndex((ele) => 
      ele.type === goods.type
    )
    if(find !== -1){
      orders[find].amount += goods.amount;
    }else{
      console.log('push')
      orders.push(goods)
    }
  }
  function submit(){
    const user1 = user && user._id;
    const data = {
      goods: orders,
      user: user1
    }
    console.log(data)
    fetchPost('/api/orders/add', data).then(res => {
      if(res.code === 0){
        setOrders([]);
        alert('提交订单成功');
      }
    })
  }
  return (
    <div>
      <div className='add-order'>
        <div>
          <div onClick={() => changeType('subing')}>
            酥饼
          </div>
          <div onClick={() => changeType('xhsb')}>
            雪花酥饼
          </div>
        </div>
        <AddShopping.Provider value={{
          addShopping
        }}>
          <GoodsDetail type={type} />
        </AddShopping.Provider>
      </div>
      <button onClick={submit}>提交</button>
    </div>
  )
}