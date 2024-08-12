import React from 'react'

export const isValid=(a,b,c)=>{
    if(a.length>0 && b.length>0 && c.length>0){
      return true
    }
    return false
  }

export  const funcSelection=(obj)=>{
    let arr =[]
    for(let key in obj){
        arr.push({value: key, ladel: obj[key]})
    }
    return arr
  }

export const funcCur=(obj, value)=>{
    let numberValueA=0
    let numberValueB=0
  for(let key in obj){
    if(value.a===key){
          numberValueA = obj[key]
    }
  }
  for(let key in obj){
    if(value.b===key){
          numberValueB = obj[key]
    }
  }
  const result1 = value.c/numberValueA 
  const result2 = result1 * numberValueB
  const result3 =  1/numberValueA * numberValueB 
  const result4 = 1 /result3
  return {result2, result3, result4}
  }