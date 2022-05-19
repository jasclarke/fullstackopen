import React, { useState } from 'react'
import login from '../services/login'

const Login = ({ storeUser, notify }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await login({ username, password })
            window.localStorage.setItem('blogAppUser', JSON.stringify(user))
            storeUser(user)
        } catch (exception) {
            notify({
                message: exception.response.data.error,
                type: 'error'
            })

            setTimeout(() => notify(null), 5000)
        }
    }

    return (
        <>
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input id='username' type='text' name='username' value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' type='password' name='password' value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <input type='submit' value='login' />
            </form>
        </>
    )
}

export default Login