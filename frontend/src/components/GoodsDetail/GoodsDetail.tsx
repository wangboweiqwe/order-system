import React, { useState } from 'react';
import SubingDetail from './SubingDetail';
import XhsbDetail from './XhsbDetail';
import { Goods } from '../../utils/fetchPromise';

export default function GoodsDetail(props:{
  type:string
}){
  const { type } = props;
  let detail;
  switch(type){
    case('subing'):
      detail = <SubingDetail />;
      break;
    case('xhsb'):
      detail = <XhsbDetail />;
  }
  return (
    <div>
      {detail}
    </div>
  );
}