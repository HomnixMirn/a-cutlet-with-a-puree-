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
      <div>
        <form action="" method="post" onSubmit={(e) => PostFormRegister(e)}>
            <input type="text" name="name" />
            <input type="text" name="fname" />
            <input type="email" name="email" />
            <input type="text" name='username' />
            <input type="password" name='password' />
            <button type="submit">Register</button>
        </form>
      </div>
    )
}
export default Register