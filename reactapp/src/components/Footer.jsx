import './footer.css'
import React, { Component } from 'react'
import Telegram from "../static/img/Telegram.png"
import VK from "../static/img/VK.png"



function Footer(){
    return (

            <footer>
                <p className="year-footer">© 2003 — 2024</p>
                <div className="info-mess">
                    <div className="contact-info">
                        <p className="email">info@minsport.gov.ru</p>
                        <p className="phone">+7(495)720-53-80</p>
                    </div>
                <div className="mes">
                    <a href="https://t.me/Minsport_news" className="Telegram">
                        <img src={VK} alt=""/>
                    </a>
                    <a href="https://vk.com/minsportrf" className="VK">
                        <img src={Telegram} alt=""/>
                    </a>
                </div>
                </div>

            </footer>
    )
}

export default Footer
