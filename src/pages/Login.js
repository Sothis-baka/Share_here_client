import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useMutation } from '@apollo/client';
import md5 from "md5";

import { LOGIN_MUTATION } from "./graphql/mutations";
import '../styles/Login.css';
import appIcon from "./sources/appIcon.png";

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        verified: false,
        loginFailed: false
    });

    const [login, { loading, error }] = useMutation(
        LOGIN_MUTATION,
        {
            onCompleted: ({ login }) => {
                if(login?.status === '200'){
                    // Authenticated
                    const user = login.user;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('loginTime', String(new Date().getTime()));
                    setLoginInfo({ ...loginInfo,  verified: true });
                }else if(login?.status === '401'){
                    // Rejected
                    setLoginInfo({ ...loginInfo, loginFailed: true });
                }
            }
        }
    );

    const handleChange = (e) => {
        if(e.target.name === 'username') {
            setLoginInfo({ ...loginInfo, username: e.target.value });
        }else {
            setLoginInfo({ ...loginInfo, password: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Debounce, and prevent empty input
        if(loading || !loginInfo.username || !loginInfo.password){
            return;
        }

        await login({
            variables: {
                // send encrypted password
                loginUserInput: { username: loginInfo.username, password: md5(loginInfo.password) }
            }
        });
    }

    /* User is verified, redirect to main page */
    if(loginInfo.verified){
        return <Redirect to='./home'/>;
    }

    return (
        <form id='loginWrapper' onSubmit={ handleSubmit }>
            <Link to='home'><img src={ appIcon } alt='Logo' id="loginLogo"/></Link>
            <h1>Please sign in</h1>
            <input className='formInput' name='username' type='text' placeholder='Username' autoFocus={ true } onChange={ handleChange }/>
            <input className='formInput' name='password' type='password' placeholder='Password' onChange={ handleChange }/>
            <small>
                New user? <Link to='./register'>Sign up here</Link>
                <p id='alert'>
                    {
                        error ? "Network error, try again later" : (loginInfo.loginFailed ? "Can't login with given information" : null)
                    }
                </p>
            </small>

            <input id='loginBtn' type='submit' value='Sign in'/>

            {
                // Display animation when loading, put at last won't cause other component rerender
                loading ? "loading": null
            }
        </form>
    );
};

export default Login;