import React from 'react'
import axios from 'axios'
import { API_URL} from '../index'
import './Login.css'

function Login()  {

    function PostFormLogin(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const login = data.get('username')
        const password = data.get('password')
        axios.post(API_URL + 'personal_info', {login,password}).then(
            res => {
                localStorage.setItem('token', res.data.token)
            }
        ).catch(err => {
            console.log(err)
        })
    }
    return (
    <div className='modal-form'>
        <form className = 'form log' action="" method="post" onSubmit={(e) => PostFormLogin(e)}>
            <h1 className="form-h1">Вход</h1>
            <a href="" className="form-a">Еще нет аккаунта?</a>
            <input type="text" name='username' placeholder="Логин" className='input-form' required/>
            <input type="password" name='password' placeholder="Пароль" className='input-form' required/>
            <button type="submit" className="form-button">Вход</button>
        </form>
      </div>
    )
}
export default Login