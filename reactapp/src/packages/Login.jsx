import React from 'react'
import axios from 'axios'
import { API_URL} from '../index'

function Login()  {

    function PostFormRegister(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const username = data.get('username')
        const password = data.get('password')
        axios.post(API_URL + 'register', {username,password}).then(res => console.log(res)).catch(err => {
            console.log(err)
        })
    }
    return (
      <div>
        <form action="" method="post" onSubmit={(e) => PostFormLogi(e)}>
            <input type="text" name='username' />
            <input type="password" name='password' />
            <button type="submit">Register</button>
        </form>
      </div>
    )
}
export default Login