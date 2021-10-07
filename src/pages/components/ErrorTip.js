import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import '../../styles/ErrorTip.css';

const ErrorTip = ({ text }) => {
    const [read, setRead] = useState(false);

    const handleClick = () => {
        setRead(true);
    }

    if(read){
        return <Redirect to='/'/>;
    }

    return (
        <div id='errorOuterWrapper'>
            <div id='errorWrapper' className='mod'>
                <span>{ text }</span>
                <button className='homeBtn' onClick={ handleClick }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 17.5">
                        <path d="M0,9.5A8.01,8.01,0,0,1,7.5,1.516V0l3,2-3,2V2.518A7,7,0,1,0,15,9.5h1a8,8,0,0,1-16,0Z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default React.memo(ErrorTip);