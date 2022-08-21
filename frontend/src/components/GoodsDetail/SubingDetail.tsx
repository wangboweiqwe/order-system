import React, { useContext, createContext } from 'react';
import { AddShopping } from '../AddOrder/AddOrder';

export default function SubingDetail(){
  const { addShopping } = useContext(AddShopping);
  return(
    <div>
      <div onClick={() => {addShopping({
        type: 'sb700g',
        amount: 1
      })}}>
        酥饼700g
      </div>
      <div>
        酥饼5斤
      </div>
    </div>
  );
}