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
        雪花酥饼10个
      </div>
      <div>
        雪花酥饼9斤
      </div>
    </div>
  );
}