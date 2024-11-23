import {API_URL} from '../index'
import axios from 'axios'
import './LK.css'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function LK()  {

    const [user_data, setUser_data] = useState({})

    useEffect(() => {
        if (!localStorage.getItem('token')) return
        axios.get(API_URL + 'personal_info', {  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => {
            if (res.status !== 200) {localStorage.removeItem('token'); window.location.href = '/'}

            setUser_data(res.data)

        }).catch(err => {
            localStorage.removeItem('token')
        } )
    }, [])

    console.log(user_data)

    return (
        
        <div className='lk'>
            <h1>Личный кабинет</h1>
        </div>
    )
}

export default LK