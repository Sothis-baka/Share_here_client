import { useState } from "react";
import {Link, Redirect} from "react-router-dom";
import { useMutation } from '@apollo/client';
import md5 from "md5";

import {REGISTER_MUTATION} from "./graphql/mutations";
import { usernameValid, passwordValid } from "./utils/inputValidate";
import '../styles/Register.css';
import appIcon from "./sources/appIcon.png";
import Loading from "./components/Loading";


const Register = () => {
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        password: "",
        repeatPassword: "",
        usernameValid: false,
        passwordValid: false,
        repeatPasswordValid: true,
        verified: false,
        registerFailed: false
    });

    const [register, { loading, error }] = useMutation(
        REGISTER_MUTATION,
        {
            onCompleted: ({ register }) => {
                if(register?.status === '201'){
                    // Created
                    const user = register.user;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('loginTime', String(new Date().getTime()));
                    setRegisterInfo({ ...registerInfo, verified: true });
                }else if(register?.status === '409'){
                    // Rejected
                    setRegisterInfo({ ...registerInfo, registerFailed: true });
                }
            }
        }
    );

    const handleChange = (e) => {
        const newRegisterInfo = { ...registerInfo };
        const value = e.target.value;

        switch (e.target.name){
            case "username":
                newRegisterInfo.username = value;
                // Update if username valid changes
                if(!newRegisterInfo.usernameValid){
                    if(usernameValid(value)){
                        newRegisterInfo.usernameValid = true;
                    }
                }else {
                    if(!usernameValid(value)){
                        newRegisterInfo.usernameValid = false;
                    }
                }
                break;
            case "password":
                newRegisterInfo.password = value;
                // Update if password valid changes
                if(!newRegisterInfo.passwordValid){
                    if(passwordValid(value)){
                        newRegisterInfo.passwordValid = true;
                    }
                }else {
                    if(!passwordValid(value)){
                        newRegisterInfo.passwordValid = false;
                    }
                }
                // Update if repeat password valid changes
                if(!newRegisterInfo.repeatPasswordValid){
                    if(value === newRegisterInfo.repeatPassword){
                        newRegisterInfo.repeatPasswordValid = true;
                    }
                }else {
                    if(value !== newRegisterInfo.repeatPassword){
                        newRegisterInfo.repeatPasswordValid = false;
                    }
                }
                break;
            case "repeatPassword":
                newRegisterInfo.repeatPassword = value;
                // Update if repeat password valid changes
                if(!newRegisterInfo.repeatPasswordValid){
                    if(value === newRegisterInfo.password){
                        newRegisterInfo.repeatPasswordValid = true;
                    }
                }else {
                    if(value !== newRegisterInfo.password){
                        newRegisterInfo.repeatPasswordValid = false;
                    }
                }
                break;
            default:
                break;
        }

        // setState
        setRegisterInfo(newRegisterInfo);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Debounce, and prevent invalid input
        if(loading || !registerInfo.usernameValid || !registerInfo.passwordValid || !registerInfo.repeatPasswordValid ){
            return;
        }

        await register({
            variables: {
                // send encrypted password
                registerUserInput: { username: registerInfo.username, password: md5(registerInfo.password) }
            }
        });
    }

    /* User is verified, redirect to main page */
    if(registerInfo.verified){
        return <Redirect to='./home'/>;
    }

    return (
        <div id='registerWrapper'>
            <h1>Create a new account</h1>
            <form id='registerFormWrapper' onSubmit={ handleSubmit }>
                <div className='block logoBlock'>
                    <Link to='./home'><img src={ appIcon } alt='Logo' id="registerLogo"/></Link>
                </div>
                <div className='block'>
                    <div className='inputGroup'>
                        <input className='formInput' name='username' type='text' placeholder='Username' onChange={ handleChange } autoFocus={ true } autoComplete="off"/>
                        { registerInfo.usernameValid ? null : <small>4-12 letters, numbers or _.</small> }
                    </div>
                    <div className='inputGroup'>
                        <input className='formInput' name='password' type='password' placeholder='Password' onChange={ handleChange }/>
                        { registerInfo.passwordValid ? null : <small>8+ with uppercase, lowercase and number.</small> }
                    </div>
                    <div className='inputGroup'>
                        <input className='formInput' name='repeatPassword' type='password' placeholder='Confirm your password' onChange={ handleChange }/>
                        { registerInfo.repeatPasswordValid ? null : <small>Must be the same as above.</small> }
                    </div>
                </div>
                <div className='block'>
                    <span>Already have an account?</span>
                    <Link to='./login'>Log in here</Link>

                    <div id='alertWrapper'>
                        <input id='registerBtn' type='submit' value='Sign up'/>
                        <p id='alert'>
                            {
                                error ? "Network Error! Please check your connection" : (registerInfo.registerFailed ? "Username is already taken" : null)
                            }
                        </p>
                    </div>
                </div>
            </form>

            {
                // Display animation when loading, put at last won't cause other component rerender
                loading ? <Loading/> : null
            }
        </div>
    );
}

export default Register;