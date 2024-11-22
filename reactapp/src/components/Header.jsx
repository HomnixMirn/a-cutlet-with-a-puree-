import './header.css'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import info from "../static/img/Info.png"
import calendar from "../static/img/Calendar.png"
import profile from "../static/img/Male User.png"
import log from "../static/img/Logout.png"
import { API_URL } from '..';
import axios from 'axios';

function Header() {
    useEffect(() => {
        axios.get(API_URL + 'personal_info', {  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => {
            const data = res.data
        }).catch(err => {
            console.log(err)
        })
    })
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
            <a href="" className="logo">Sport Pulse</a>
            <div className="header-left">
            <a href="" className='header-a'>
                <img src={info} alt="" className="header-img"/>
                <h1 className="header-a-h1">О нас</h1>
            </a>
            <a href="" className='header-a'>
                <img src={calendar} alt="" className="header-img" />
                <h1 className="header-a-h1">Календарь</h1>
            </a>
            { localStorage.getItem('token')
            ?<>
                <a href="" className='header-a'>
                <img src={profile} alt="" className="header-img" />
                <h1 className="header-a-h1">Профиль</h1>
                </a>
                <a href="" className='header-a' onClick={(e) => LogOut(e)}>
                <img src={log} alt="" className="header-img"/>
                <h1 className="header-a-h1">Выход</h1>
                </a>
            </>
            :<>
            <Link to={"/register"}>Register</Link>
            <Link to={"/personal_info"}>Login</Link>
            </>
            }
            </div>
        </header>
    )
}

export default Header