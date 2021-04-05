import React, { useState } from 'react';
import {Link, Redirect} from "react-router-dom";
import md5 from 'md5';

import { usernameValid, passwordValid } from './utils/inputValidation';
import { REGISTER_MUTATION } from './graphql/mutations';

import '../styles/Register.css';
import {useMutation} from "@apollo/client";

const Register = () => {
    const [formState, setFormState] = useState( {
        username: '',
        password: '',
        repeatPassword: '',
        usernameInvalid: true,
        passwordInvalid: true,
        repeatPasswordInvalid: true,
        redirectToHome: false,
        registerFailedMsg: null
    });

    const [register, { loading: mutationLoading, error: mutationError }] = useMutation(REGISTER_MUTATION);

    const handleChange = async (e) => {
        const newVal = e.target.value;
        const cpyFormState = {...formState};

        switch (e.target.name){
            case 'username':
                cpyFormState.username = newVal;
                if(formState.usernameInvalid){
                    if(usernameValid(newVal)){
                        cpyFormState.usernameInvalid = false;
                    }
                }else{
                    if(!usernameValid(newVal)){
                        cpyFormState.usernameInvalid = true;
                    }
                }
                break;

            case 'password':
                cpyFormState.password = newVal;

                if(formState.passwordInvalid){
                    if(passwordValid(newVal)){
                        cpyFormState.passwordInvalid = false;
                    }
                }else{
                    if(!passwordValid(newVal)){
                        cpyFormState.passwordInvalid = true;
                    }
                }

                if(formState.repeatPasswordInvalid){
                    if(newVal === formState.repeatPassword){
                        cpyFormState.repeatPasswordInvalid = false;
                    }
                }else{
                    if(newVal !== formState.repeatPassword){
                        cpyFormState.repeatPasswordInvalid = true;
                    }
                }
                break;

            case 'confirmPassword':
                cpyFormState.repeatPassword = newVal;

                if(formState.repeatPasswordInvalid){
                    if(formState.password === newVal){
                        cpyFormState.repeatPasswordInvalid = false;
                    }
                }else{
                    if(formState.password !== newVal){
                        cpyFormState.repeatPasswordInvalid = true;
                    }
                }
                break;

            default:
                console.log(e)
                break;
        }

        setFormState(cpyFormState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formState.usernameInvalid && !formState.passwordInvalid && !formState.repeatPasswordInvalid){
            const { data } = await register({ variables: { registerUserInput: {username: formState.username, password: md5(formState.password) }}});

            if(data?.register?.success){
                const user = data.register.user;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', user.token);
                localStorage.setItem('loginTime', String(new Date().getTime()));

                setFormState({...formState, redirectToHome: true });
            }else{
                setFormState({...formState, registerFailedMsg: data?.register?.message});
            }
        }else{
            setFormState({...formState, registerFailedMsg:'Invalid input, pls check'});
        }
    }


    if(formState.redirectToHome){
        return <Redirect to='/'/>
    }

    return(
        <div id='registerWrapper' className='container-fluid'>
            <h1 id='registerTitle'>Create a new account</h1>
            <form className='row' onSubmit={handleSubmit}>
                <div id='firstPart' className='col-lg-3 center'>
                    <img src={process.env.PUBLIC_URL + 'appIcon.png'} alt="Can't find app icon." id='registerIcon'/>
                </div>


                <div id='secondPart' className='col-lg-5 col-md-6 col-12'>
                    <div id='registerForm' className='registerFormWrapper center'>
                        <div className={'inputWrapper ' + (formState.usernameInvalid && 'Invalid')}>
                            <input type='text' name='username' placeholder='Username' onChange={handleChange} autoFocus={true} autoComplete="none" required/>
                            <small className='toolTip'>4-12 letters, numbers or _.</small>
                        </div>
                        <div className={'inputWrapper ' + (formState.passwordInvalid && 'Invalid')}>
                            <input type='password' name='password' placeholder='Password' onChange={handleChange} required/>
                            <small className='toolTip'>8+ with uppercase, lowercase and number.</small>
                        </div>
                        <div className={'inputWrapper ' + (formState.repeatPasswordInvalid && 'Invalid')}>
                            <input type='password' name='confirmPassword' placeholder='Confirm your password' onChange={handleChange} required/>
                            <small className='toolTip'>Must be the same as above.</small>
                        </div>
                    </div>
                </div>

                <div id='thirdPart' className='col-lg-4 col-md-6 col-12 center'>
                    <p>Already have an account?</p>
                    <Link to='./login'><span>Log in here</span></Link>
                    <p><input type='submit' value='Sign up' id='registerBtn'/></p>

                    { formState.registerFailedMsg || null }
                    { mutationLoading && <p>Loading...</p> }
                    { mutationError && <p>Error :( Please try again</p> }
                </div>
            </form>
        </div>
    );
}

export default Register;