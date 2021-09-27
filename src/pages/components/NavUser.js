import React from "react";
import { Link } from "react-router-dom";

import meko from "../sources/meko.jpg";

const NavUser  = ({ username }) => {
    return (
        <div id='navUser' className='mod'>
            {
                username
                    ? <><img src={ meko } alt='user icon' id="userIcon"/><span>{ username }</span></>
                    : <Link to='./login'><button className='homeBtn'>Login</button></Link>
            }
        </div>
    );
};

export default React.memo(NavUser);