export interface User {
  name: string,
  role: number,
  _id: string
}
export interface Response {
  code: number,
  msg: string | undefined,
  user: undefined | User,
  data: undefined | {} | Orders[]
}
export interface Orders {
  _id: string,
  goods: Goods[],
  user: string
}

export interface Shop{
  addShopping: (str:string) => void
}

export interface Goods{
  type: string,
  amount: number
}

function fetchGet(url:string):Promise<Response>{
  return fetch(url, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((data) => {
    return data.json();
  }).catch((err) => {
    console.log(err);
  });
}

function fetchPost(url:string , data: string | {}):Promise<Response>{
  return fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then((data) => {
    return data.json();
  }).catch((err) => {
    console.log(err);
  });
}
export { fetchGet, fetchPost };