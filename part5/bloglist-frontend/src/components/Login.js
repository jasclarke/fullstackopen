import React, {useState} from "react"
import login from '../services/login'

const Login = ({storeUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
            const user = await login({username, password})
            storeUser(user)
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input id='username' type='text' name='username' value={username} onChange={({target}) => setUsername(target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' type='password' name='password' value={password} onChange={({target}) => setPassword(target.value)} />
                </div>
                <input type='submit' value='login' />
            </form>
        </>
    )
}

export default Login