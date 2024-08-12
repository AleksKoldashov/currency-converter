import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Select, Spin } from 'antd';
import './App.css';
import BlockCurrency from './components/BlockCurrency';
import { isValid } from './components/Utilits/Utilits';
import { useQuery } from 'react-query';




function App() {

 
const [value, setValue]=useState({a:'RUB', b:'USD',c:100})
const handleChange = (event) => {
  setValue({...value, c: event.target.value})
};
const handleChangeA = (item) => {
  setValue({...value, a: item})
};
const handleChangeB = (item) => {
  setValue({...value, b: item})
};
const handelClickA=(event)=>{
  setValue({...value, a: event.target.innerText})
  // console.log(event.target.innerText);
}
const handelClickB=(event)=>{
  setValue({...value, b: event.target.innerText})
  // console.log(event.target.innerHTML);
}
console.log(value);

console.log(isValid(value.a,value.b,value.c));

const data = useQuery({
  queryKey:['data'],
  queryFn:  async () =>{
      const response = await fetch (`https://openexchangerates.org/api/latest.json?app_id=891aea79df3444faba3497f7347e940c`
      )
      if (!response.ok) {
          throw new Error('Что-то пошло не так');
        }
        return await response.json();
  },
  enabled: true,
  // select: data=>data
})

// const [data, setData]=useState()
// https://api.currencylayer.com/live?access_key=18582a4eb4023a3f23c0ae3515991ea9
// useEffect(()=>{
//   fetch('https://openexchangerates.org/api/latest.json?app_id=891aea79df3444faba3497f7347e940c',{
    
//     headers:  { 
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     }
//   }
// )
//       .then(response => response.json())
//       .then(json => setData(json))
// },[])
// useEffect(()=>{
//   fetch('https://openexchangerates.org/api/currencies.json?app_id=891aea79df3444faba3497f7347e940c',{
//     headers:  { 
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     }
//   }
// )
//       .then(response => response.json())
//       .then(json => setData(json))
// },[])
// console.log(data.data.rates);

if(data.isLoading)return <Spin/>
if(data.isError)return <p>Error: {data.error.message}</p>

  return (
    <ConfigProvider
    theme={{
      token: {
          colorPrimary: 'rgba(70, 163, 88, 1)',
      },
    }}
    >
    <div className="App">
      <div className='header'>
        <h1>Конвертер валют</h1>
      </div>
      <div className='body'>
       <BlockCurrency handelClick={handelClickA} handleChange={handleChangeA} handleChangeI={handleChange} titel='У меня есть:' value={value} togle={true} data={data.data.rates}/>
       <BlockCurrency handelClick={handelClickB} handleChange={handleChangeB} titel='Хочу приобрести:' value={value} togle={false}  data={data.data.rates}/>
      </div>
    </div>
    </ConfigProvider>
   
  );
}

export default App;
