'use client'

import React from 'react'
import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
import {message} from 'antd'
import io from 'socket.io-client'
import Link from 'next/link';

const Bid = () => {
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJmYWlzYWwxMDI0IiwiZW1haWwiOiJmYWlzYWxAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MTc3MzI0NzIsImV4cCI6MTcxNzc2ODQ3Mn0.91ErEybi53QHQ35JQdqiEya69hany3IB2EviwKpInB4"
    const [bid, setBid] = useState("")
    const [data, setData] = useState('')
    const [user, setUser] = useState('')
    
    function establishWS() {
        // Connect to the bidding namespace
        const biddingSocket = io('http://localhost:8001/bidding', {
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
    
    useEffect(() => {
        establishWS()
        }, [])
        
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
    
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
        <Link href={'/'} className='text-lg text-blue-800'>BACK TO HOME</Link>
        <form onSubmit={handleSubmit} className='flex gap-5'>
          <input type="text" className="p-5 border rounded-lg border-black dark:text-black" onChange={(e) => setBid(e.target.value)} />
          <button className='border border-blue-600 rounded-lg p-5' type="submit">Submit</button>
        </form>
      </main>
    )
}

export default Bid
