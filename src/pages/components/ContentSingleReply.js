import React from "react";
import getDisplayTime from "../utils/getDisplayTime";

const ContentSingleReply = ({ r }) => {
    const username = localStorage.getItem('username');

    return (
        <li className='replyCard'>
            <hr/>
            <div className='cardUsername'>{ r.username }</div>
            <div className='replyContent'>{ r.content }</div>
            <div className='replyBottom'>{ getDisplayTime(r.replyAt) }{ username === r.username ? <span>delete</span> : null }</div>
        </li>
    )
}

export default React.memo(ContentSingleReply);