import React from 'react'
import axios from 'axios'
import { API_URL} from '../index'
import './Register.css'

function Register()  {

    function PostFormRegister(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const username = data.get('username')
        const password = data.get('password')
        const name = data.get('name')
        const fname = data.get('fname')
        const email = data.get('email')
        const time_zone = (new Date().getTimezoneOffset())/60;
        axios.post( API_URL + 'register', {username,password,name,fname,email,time_zone}).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='modal-form'>
            <form className = 'form' action="" method="post" 
            onSubmit={(e) => PostFormRegister(e)}>
                <h1 className="form-h1">Регистрация</h1>
                <a href="" className="form-a">Уже есть аккаунт?</a>
                <div className="form-mini-block">
                    <input type="text" name="name" placeholder="Имя" className='input-form' required/>
                    <input type="text" name='username' placeholder="Логин" className='input-form' required/>
                </div>
                <div className="form-mini-block">
                    <input type="text" name="fname" placeholder="Фамилия" className='input-form' required/>
                    <input type="password" name='password' placeholder="Пароль" className='input-form' required/>
                </div>
                <input type="email" name="email" placeholder="Электронная почта" className='input-form em' required />
                <div className="block-checkbox">
                    <input type="checkbox" name="checkbox" className='checkbox' required/>
                    <label for="checkbox" className='checkbox-label'>Я согласен с правилами регистрации</label>
                </div>
                <button type="submit" class="form-button">Зарегистрироваться</button>
            </form>
        </div>
    )
}
export default Register