import React, { Component, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './About.css'
import axios from 'axios';
import { API_URL } from '..';


function About(){
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setEvents(res.data))
            .catch(err => console.error('Ошибка при получении данных', err))
    } ,[]);
    console.log(events)

    const handleDetailsClick = (id) => {
        navigate(`/event/${id}`);
    };
    return (
      <div className="main-about">
        <div className="about-02">
            <h1 className="h1-about">БЛИЖАЙШИЕ МЕРОПРИЯТИЯ</h1>
                <div className="three-cart">
                    {events.map((event,index) =>(
                    <div key ={index} className={`cart-two${index + 1}`}>
                        <p className="name-cart" maxlength = "10" >{event.name}</p>
                        <div className="p-class">
                            <p className="about-cart">Место проведения:{event.location}</p>
                        </div>
                        <div className="div__about-button">
                        <button type="button" className="about-button" onClick={() => handleDetailsClick(event.id)}>ПОДРОБНЕЕ</button>
                            </div>    
                        <div className="date-about">
                                <p className="p-date">{event.date_start}</p>
                            </div>
                    </div>
                    ))}
                        
            </div>
        </div>
      </div>
    )
}
export default About
