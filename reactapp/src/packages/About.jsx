import React, { Component } from 'react'
import './About.css'


function About(){
    return (
      <div className="main-about">
        <div className="about-02">
            <h1 className="h1-about">БЛИЖАЙШИЕ МЕРОПРИЯТИЯ</h1>
                <div className="three-cart">
                    <div className="cart-two1">
                        <p className="name-cart">ТУРНИР ПО БАСКЕДБОЛУ</p>
                        <div className="p-class">
                                <p className="about-cart">Вид:</p>
                                <p className="about-cart">Место проведения:</p>
                                <p className="about-cart">Тип моревнования:</p>
                            </div>
                        <div className="date-about">
                                <p className="p-date">05.05.2222</p>
                            </div>
                    </div>
                        <div className="cart-two2">
                            <p className="name-cart">ТУРНИР ПО БАСКЕДБОЛУ</p>
                            <div className="p-class">
                                <p className="about-cart">Вид:</p>
                                <p className="about-cart">Место проведения:</p>
                                <p className="about-cart">Тип моревнования:</p>
                            </div>
                            <div className="date-about">
                                <p className="p-date">05.05.2222</p>
                            </div>
                    </div>
                        <div className="cart-two3">
                            <p className="name-cart">ТУРНИР ПО БАСКЕДБОЛУ</p>
                            <div className="p-class">
                                <p className="about-cart">Вид:</p>
                                <p className="about-cart">Место проведения:</p>
                                <p className="about-cart">Тип моревнования:</p>
                        </div>
                        <div className="date-about">
                                <p className="p-date">05.05.2222</p>
                            </div>
                    </div>
            </div>
        </div>
      </div>
    )
}

export default About
