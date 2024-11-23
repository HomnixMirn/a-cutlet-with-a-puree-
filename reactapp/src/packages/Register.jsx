import { useState } from 'react';
import React from 'react'
import axios from 'axios'
import { API_URL} from '../index'
import './Register.css'
import { data } from 'react-router-dom';


function validateForm(data) {
    console.log(data);
    const errors = {};
    if (!data.username || data.username.length < 3 || data.username.length > 20) {
      errors.username = 'Логин должен быть от 3 до 20 символов';
    }
    if (!data.password || data.password.length < 8) {
      errors.password = 'Пароль должен быть не менее 8 символов';
    }
    if (!data.name || data.name.length < 2) {
      errors.name = 'Имя должно быть не менее 2 символов';
    }
    if (!data.fname || data.fname.length < 2) {
      errors.fname = 'Фамилия должна быть не менее 2 символов';
    }
    if (!data.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      errors.email = 'Электронная почта должна быть в формате example@example.com';
    }
    return errors;
  }

  function Register() {
    const [errors, setErrors] = useState({});
  
    function PostFormRegister(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      const checkbox = data.get('checkbox');
      const name = data.get('name');
      const fname = data.get('fname');
      const email = data.get('email');
      const username = data.get('username');
      const password = data.get('password');
      const time_zone = (new Date().getTimezoneOffset())/60;
      const escepdata = {name, fname, email, username, password, checkbox, time_zone};
      const errors = validateForm(escepdata);
      if (Object.keys(errors).length > 0) {
        console.log(errors);
        setErrors(errors);
      } else {
        const jsonData = JSON.stringify(Object.fromEntries(data));
        axios.post(API_URL + 'register', escepdata, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.status === 201 ? window.location.href = '/' : console.log(res)).catch(err => {
            console.log(err);
          });
      }
    }

    function Error(){
      const data = new FormData(data);
      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json'
        },
        validateStatus: status => {
          return status >= 200 && status < 300;
        }
      });
      
      axiosInstance.post('register', data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
          const errorMessage = error.response.data.message;
          const errorDetails = error.response.data.details;
          if (errorMessage) {
            alert(errorMessage);
          }
          if (errorDetails) {
            console.log(errorDetails);
            setErrors(errorDetails);
          }
        });
    }
    

    return (
        <div className='modal-form'>
        <form className='form' action="" method="post" onSubmit={(e) => PostFormRegister(e)}>
          <h1 className="form-h1">Регистрация</h1>
          <a href="/personal_info" className="form-a">Уже есть аккаунт?</a>
          <div className="form-mini-block">
            <input type="text" name="name" placeholder="Имя" className='input-form' required minLength="2" maxLength="50" />
            <input type="text" name='username' placeholder="Логин" className='input-form' required minLength="3" maxLength="20" pattern="[a-zA-Z0-9]+" />
          </div>
          <div className="form-mini-block">
            <input type="text" name="fname" placeholder="Фамилия" className='input-form' required minLength="2" maxLength="50" />
            <input type="password" name='password' placeholder="Пароль" className='input-form' required minLength="8" />
          </div>
          <input type="email" name="email" placeholder="Электронная почта" className='input-form em' required />
          <div className="block-checkbox">
            <input type="checkbox" name="checkbox" className='checkbox' required />
            <label for="checkbox" className='checkbox-label'>Я согласен с правилами регистрации</label>
          </div>
          <button type="submit" class="form-button">Зарегистрироваться</button>
        </form>
      </div>
    );
}
export default Register