import './header.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import info from "../static/img/Info.png"
import info2 from "../static/img/Info2.png"
import calendar from "../static/img/Calendar.png"
import calendar2 from "../static/img/Calendar2.png"
import profile from "../static/img/Male User.png"
import log from "../static/img/Logout.png"
import { API_URL } from '..';
import axios from 'axios';

function Header() {

    const [user_data, setUser_data] = useState({})

    useEffect(() => {
        if (!localStorage.getItem('token')) return
        axios.get(API_URL + 'personal_info', {  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => {
            if (res.status !== 200) localStorage.removeItem('token')

            setUser_data(res.data)

        }).catch(err => {
            localStorage.removeItem('token')
        } )
    }, [])
    function LogOut(e) {
        e.preventDefault()
        axios.get(API_URL + "logout",{  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(
            () => {
                localStorage.removeItem('token')
                window.location.href = '/'
            }
        )
    }
    return (
        <header>
            <Link to={'/'} className="logo">Sport Pulse</Link>
            <div className="header-left">
            <Link to={'/'} className='header-a'>
                <img src={info} alt="" className="header-img"/>
                <img src={info2} class="header-img-hover"/>
                <h1 className="header-a-h1">О нас</h1>
            </Link>
            <Link to={'/calendar'} className='header-a'>
                <img src={calendar} alt="" className="header-img" />
                <img src={calendar2} class="header-img-hover"/>
                <h1 className="header-a-h1">Календарь</h1>
            </Link>
            { localStorage.getItem('token')
            ?<>
                <a href="" className='header-a'>
                <img src={profile} alt="" className="header-img" />
                <Link to={'/user'} className="header-a-h1 header-a">Профиль</Link>
                </a>
                <a href="" className='header-a' onClick={(e) => LogOut(e)}>
                <img src={log} alt="" className="header-img"/>
                <h1 className="header-a-h1">Выход</h1>
                </a>
            </>
            :<>
            <ul className="ul-header">
                <Link to={"/personal_info"} className="personal_info">Вход</Link>
                <Link to={"/register"} className="register">/Регистрация</Link>
            </ul>
            </>
            }
            </div>
        </header>
    )
}

export default Header