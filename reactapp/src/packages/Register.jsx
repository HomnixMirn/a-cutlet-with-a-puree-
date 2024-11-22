import React from 'react'
import axios from 'axios'
import { API_URL} from '../index'

function Register()  {

    function PostFormRegister(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const username = data.get('username')
        const password = data.get('password')
        const name = data.get('name')
        const fname = data.get('fname')
        const email = data.get('email')
        axios.post(API_URL + 'register', {username,password,name,fname,email}).catch(err => {
            console.log(err)
        })
    }
    return (
      <div className="main-reg">
        <form action="" method="post" onSubmit={(e) => PostFormRegister(e)}>
            <h1 class="h1-reg">РЕГИСТРАЦИЯ</h1>
              <p className="p-reg">у меня есть аккаунт</p>
                <div class="input-reg">
                    <input type="text" name="name" />
                    <input type="text" name="fname" />
                    <input type="email" name="email" />
                    <input type="text" name='username' />
                    <input type="password" name='password' />
                  </div>
                <button type="submit">Register</button>
        </form>
      </div>
    )
}
export default Register