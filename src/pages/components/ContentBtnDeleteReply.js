import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {Redirect} from "react-router-dom";

import Loading from "./Loading";
import ErrorTip from "./ErrorTip";

import { DELETE_REPLY } from "../graphql/mutations";


const ContentBtnDeleteReply = ({ replyId }) => {
    const [rejected, setRejected] = useState(false);
    const [deleteReply, { loading, error }] = useMutation(DELETE_REPLY, {
        variables: { deleteReplyReplyId: replyId },
        onCompleted: ({ deleteReply }) => {
            if(deleteReply?.status === '401' || deleteReply?.status === '403'){
                // rejected, not logged in, or user doesn't have authority (not author, if user changed username in localstorage)
                setRejected(true);
            }else if(deleteReply?.status === '404'){
                // post doesn't exist anymore, shouldn't happen if database isn't directly touched.
                // will refetch after the mutation
            }else if(deleteReply?.status === '204'){
                // Successful
            }
        },
        refetchQueries: ['getReplies']
    })

    const handleClick = async () => {
        // debounce
        if(loading){
            return;
        }

        await deleteReply();
    }

    if(rejected){
        return <Redirect to='/login'/>
    }

    return (
        <>
            <span onClick={ handleClick }>delete</span>
            { loading && <Loading/> }
            { error && <ErrorTip text="Network Error!"/> }
        </>
    );
}

export default React.memo(ContentBtnDeleteReply);