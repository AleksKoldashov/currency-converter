import React from 'react'
import { Button, Input, Select, Spin } from 'antd';
import { useQuery } from 'react-query';
import { funcCur, funcSelection } from './Utilits/Utilits';


export default function BlockCurrency({handelClick, handleChange,handleChangeI, titel, value, togle, data}) {
  const currencies = useQuery({
    queryKey:['currencies'],
    queryFn:  async () =>{
        const response = await fetch (`https://openexchangerates.org/api/currencies.json?app_id=891aea79df3444faba3497f7347e940c`)
        if (!response.ok) {
            throw new Error('Что-то пошло не так');
          }
          return await response.json();
    },
    enabled: true,
    // select: data=>data
})


const arrBtn = ['RUB', 'USD', 'EUR', 'GBP']




if(currencies.isLoading)return <Spin/>
if(currencies.isError)return <p>Error: {currencies.error.message}</p>
  return (
    <div className='left'>
    <h2>{titel}</h2>
    <Button.Group>
     {
      arrBtn.map((item, index)=><Button
        key={index}
        onClick={handelClick}
        >{item}</Button>
      )
     } 
    <Select 
    style={{width:'70px'}}
    dropdownStyle={{width: '300px'}}
    onChange={handleChange}
    options={funcSelection(currencies.data)}
    />
    </Button.Group>
    {
      togle ? 
      <div
      className='content'
      >
      <div className='block-input'>
        <Input
        value={value.c}
        onChange={handleChangeI}
        style={{height:'60px', fontSize:'34px', width:'200px', fontWeight:'700', border:'none'}}
        />
        <h1>{value.a}</h1>
      </div>
      <h5>1 {value.a} = {funcCur(data, value).result3.toFixed(4)} {value.b}</h5>
      </div>
      :
      <div
      className='content'
      >
      <div className='block-input'>
        <h1>{funcCur(data, value).result2.toFixed(4)}</h1><h1>{value.b}</h1>
      </div>
      <h5>1 {value.b} = {funcCur(data, value).result4.toFixed(4)} {value.a}</h5>
      </div>
    }
  </div>
  )
}
