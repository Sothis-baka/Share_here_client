import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";

import Loading from "./Loading";
import ErrorTip from "./ErrorTip";

import { DELETE_POST } from "../graphql/mutations";


const ContentBtnDelete = ({ postId }) => {
    const [rejected, setRejected] = useState(false);
    const [deletePost, { loading, error }] = useMutation(DELETE_POST, {
        variables: { deletePostPostId: postId },
        onCompleted: ({ deletePost }) => {
            if(deletePost?.status === '401' || deletePost?.status === '403'){
                // rejected, not logged in, or user doesn't have authority (not author, if user changed username in localstorage)
                setRejected(true);
            }else if(deletePost?.status === '404'){
                // post doesn't exist anymore, shouldn't happen if database isn't directly touched.
            }else if(deletePost?.status === '204'){
                // Successful
            }
        },
        // In any way it will refetch posts from the server to get the latest version
        refetchQueries: ['getPosts']
    });

    const handleClick = async () => {
        // debounce
        if(loading){
            return;
        }

        await deletePost();
    };

    if(rejected){
        return <Redirect to='/login'/>
    }

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className='cardDeleteBtn' onClick={ handleClick }>
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            { loading && <Loading/> }
            { error && <ErrorTip text="Network Error!"/> }
        </div>
    );
};

export default React.memo(ContentBtnDelete);