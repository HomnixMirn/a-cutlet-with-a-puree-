import {API_URL} from '../index'
import axios from 'axios'
import './LK.css'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LK()  {
    const navigate = useNavigate();
    const [user_data, setUser_data] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('token')) return
        axios.get(API_URL + 'personal_info', {  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => {
            if (res.status !== 200) {localStorage.removeItem('token'); window.location.href = '/'}

            readData(res)

        }).catch(err => {
            localStorage.removeItem('token')
        } )
    }, [])


    function readData(res){
        setUser_data(res.data)
        setEvents(res.data['get_events'])
    }
    console.log(user_data)

    const handleDetailsClick = (id) => {
        navigate(`/event/${id}`);
    };

    return (
        
        <div className='lk'>
            
            <div className="main">
                <div className="user_data">
                    <p className="p_user_data name">{user_data.name}</p>
                    <p className="p_user_data fname">{user_data.fname}</p>
                    <p className="p_user_data email">{user_data.email}</p>
                    <p className="p_user_data username">{user_data.user_name}</p>
                </div>
                <div className="user_events">
                    <h1 className="events">Зарегистрированные события</h1>
                    <div className="events_cards">
                        {events.map((event, index) => (
                            <div key={index} className="event">
                                <div className="card">
                                    <div className="info">
                                        <p className="event_name">{event.name}</p>
                                        <div className="small_data">
                                        <p className="event_date">Дата начала<br></br> {event.date_start}</p>
                                        <p className="event_location">{event.location}</p>
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        {/* TODO: переход на подробнее */}
                                        <button onClick={() => {handleDetailsClick(event.id)}} className="button_delete">подробнее</button>
                                        <button onClick={() => {axios.post(API_URL + 'delete_personal_event', {id: event.id} , {  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => {window.location.href = '/user'})}} className="button_open">отменить</button>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LK