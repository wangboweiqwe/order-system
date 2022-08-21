import React, { createContext, useContext } from 'react';
import { AddShopping } from '../AddOrder/AddOrder';

export default function XhsbDetail(){
  const { addShopping } = useContext(AddShopping);
  return(
    <div>
      <div onClick={() => {addShopping({
        type: 'xhsb700',
        amount: 1
      })}}>
        雪花酥饼700g
      </div>
      <div>
        酥饼5斤
      </div>
    </div>
  );
}