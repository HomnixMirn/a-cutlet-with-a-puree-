import './header.css'
import { useEffect  } from "react";
import { Link, useLocation } from "react-router-dom";
import info from "../static/img/Info.png"
import info2 from "../static/img/Info2.png"
import calendar from "../static/img/Calendar.png"
import calendar2 from "../static/img/Calendar2.png"
import profile from "../static/img/Male User.png"
import profile2 from "../static/img/Male User1.png"
import log from "../static/img/Logout.png"
import log2 from "../static/img/Logout2.png"
import { API_URL } from '..';
import axios from 'axios';

function Header() {

    const location = useLocation().pathname;
    console.log(location)
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
            <Link to={'/'} className="logo">Sport Pulse</Link>
            <div className="header-left">
            <Link to={'/'} className={location === '/' ? 'active-header header-a ' : 'header-a'}>
                <img src={info} alt="" className={location === '/' ? ' header-img active-header-img' : 'header-img'}/>
                <img src={info2} class={location === '/' ? 'active-header-img-hover header-img-hover ' : 'header-img-hover'}/>
                <h1 className={location === '/' ? ' header-a-h1 active-header-h1' : 'header-a-h1'}>О нас</h1>
            </Link>
            <Link to={'/calendar'} className={location === '/calendar' ? 'active-header header-a ' : 'header-a'}>
                <img src={calendar} alt="" className={location === '/calendar' ? ' header-img active-header-img' : 'header-img'} />
                <img src={calendar2} class={location === '/calendar' ? 'active-header-img-hover header-img-hover ' : 'header-img-hover'}/>
                <h1 className={location === '/calendar' ? ' header-a-h1 active-header-h1' : 'header-a-h1'}>Календарь</h1>
            </Link>
            { localStorage.getItem('token')
            ?<>
            <Link to={'/user'} className={location === '/user' ? 'active-header header-a ' : 'header-a'}>
                <img src={profile} alt="" className={location === '/user' ? 'active-header-img header-img ' : 'header-img'}/>
                <img src={profile2} alt="" className={location === '/user' ? 'active-header-img-hover header-img-hover ' : 'header-img-hover'}/>
                <h1 className="header-a-h1">Профиль</h1>
            </Link>
                <a href="" className='header-a' onClick={(e) => LogOut(e)}>
                <img src={log} alt="" className="header-img"/>
                <img src={log2} alt="" className="header-img-hover"/>
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