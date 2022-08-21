import React, { useEffect, useState } from 'react'
import { Orders } from '../../utils/fetchPromise';

export default function OrderList() {
  const [orders, setOrders] = useState<Orders[]>([])
  useEffect(() => {
    fetch('/api/orders/list', {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((data) => {
      return data.json();
    }).then((res) => {
      if(res.code === 0)
        setOrders(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div>
      {orders[0] && orders.map(ele => (
        <div key={ele._id}>{ele.goods[0].type}</div>
      ))}
    </div>
  );
}