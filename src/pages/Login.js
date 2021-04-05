import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from "./graphql/mutations";

import '../styles/Login.css';
import md5 from "md5";

const Login = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        redirectToHome: false,
        loginFailed: false
    });

    const [login, { loading: mutationLoading, error: mutationError }] = useMutation(LOGIN_MUTATION);

    const handleChange = (e) => {
        const target = e.target;

        target.name === 'username'
            ? setFormState({...formState,  username: target.value})
            : setFormState({...formState,  password: target.value});
    }

    // TODO: mutation login
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data } = await login({ variables: { loginUserInput: {username: formState.username, password: md5(formState.password) }}});

        if(data?.login?.success){
            const user = data.login.user;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', user.token);
            localStorage.setItem('loginTime', String(new Date().getTime()));
            setFormState({...formState,  redirectToHome: true});
        }else{
            setFormState({...formState, loginFailed: true});
        }
    }

    if (formState.redirectToHome) return <Redirect to="/" />;

    return(
        <div className='container-fluid center login-wrapper'>
            <img src={process.env.PUBLIC_URL + 'appIcon.png'} alt="Can't find app icon." id='appIcon'/>
            <h1>Please sign in</h1>
            <form id='loginForm' className='center' onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='Username' onChange={handleChange} autoFocus={true} required/>
                <input type='password' name='password' placeholder='Password' onChange={handleChange} required/>

                <Link to='./register'>New user? <span>Sign up here</span></Link>

                <input type='submit' value='Sign in' id='signInBtn'/>
            </form>
            {formState.loginFailed && <p>Can't find user with given information</p>}
            {mutationLoading && <p>Loading...</p>}
            {mutationError && <p>Error :( Please try again</p>}
        </div>
    );

}

export default Login;