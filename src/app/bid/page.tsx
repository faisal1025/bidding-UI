'use client'

import React from 'react'
import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
import {message} from 'antd'
import io from 'socket.io-client'

const Bid = () => {
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJmYWlzYWwxMDI0IiwiZW1haWwiOiJmYWlzYWxAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MTc2OTAzODQsImV4cCI6MTcxNzcyNjM4NH0.ckNADo5-V60x8Kjks64KRB7Q7xFlkmk0GJuoX5DgyY8"
    const [bid, setBid] = useState("")
    const [data, setData] = useState('')
    const [user, setUser] = useState('')
    
    function establishWS() {
        // Connect to the bidding namespace
        const biddingSocket = io('http://localhost:8001/bidding', {
          query: {token},
          withCredentials: true,
          extraHeaders: {
            "my-custom-header": "abcd"
          }
        });
    
        biddingSocket.on('connect', () => {
            console.log('Connected to the bidding namespace');
        });
    
        biddingSocket.on('notify', (data) => {
            console.log(`bid has been created ${JSON.stringify(data.data)} by ${data.user}`)
            setData(data.data)
            setUser(data.user)
            message.info(`${data.user} has created a bid of ${data.data.bidAmount} details are ${data.data}`)
        });
        
        biddingSocket.on('disconnect', () => {
            console.log('Disconnected from the bidding namespace');
        });
        
        biddingSocket.on('connect_error', (error: any) => {
            console.error('Bidding connection error:', error);
        });

    }
    
    // useEffect(() => {
        // }, [])
        
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        establishWS()
    
        const response = await (await fetch('http://localhost:8001/api/bid/1', {
            method: "POST",
            headers: {
            'Content-type':'application/json',
            'authorization': `bearer ${token}`
        },
        body: JSON.stringify({
                bidAmount: bid
            })
        })).json()
    
    
        console.log(response);
    }
    
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form onSubmit={handleSubmit} className='flex gap-5'>
          <input type="text" className="p-5 border rounded-lg border-black dark:text-black" onChange={(e) => setBid(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </main>
    )
}

export default Bid
