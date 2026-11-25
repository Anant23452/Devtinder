import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addRequest } from '../utils/requestSlice';
import { useEffect } from 'react';

export default function Request() {
    const dispatch= useDispatch();
    const fetchRequest = async()=>{
        try{
            const res= await axios.get(BASE_URL+"/request",{
                withCredentials:true
            })
            dispatch(addRequest(res.data.data))
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchRequest()
    })
  return (
    <div>Request</div>
  )
}
