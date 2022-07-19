
function fetchPost(url:string , data: {}){
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
export { fetchPost };