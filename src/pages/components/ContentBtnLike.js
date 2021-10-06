import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";

import { TOGGLE_LIKE_POST } from "../graphql/mutations";
import Loading from "./Loading";
import ErrorTip from "./ErrorTip";

const ContentBtnLike = ({ like, postId, updateLike }) => {
    const [rejected, setRejected] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [toggleLikePost, { loading, error }] = useMutation(TOGGLE_LIKE_POST, {
        variables: { toggleLikePostId: postId },
        onCompleted: ({ toggleLike }) => {
            if(toggleLike?.status === '401'){
                // rejected
                setRejected(true);
            }else if(toggleLike?.status === '404'){
                setNotFound(true);
            }else if(toggleLike?.status === '204'){
                // success
                const newLike = toggleLike?.like;

                const user = JSON.parse(localStorage.getItem('user'));

                if(user.likes){
                    const likes = user.likes;
                    if(like){
                        if(likes.includes(postId)){
                            likes.splice(likes.indexOf(postId), 1);
                        }
                    }else {
                        likes.push(postId);
                    }
                }
                localStorage.setItem('user', JSON.stringify(user));

                updateLike(newLike);
            }
        }
    })

    const handleClick = async () => {
        // debounce
        if(loading){
            return;
        }

        await toggleLikePost();
    }

    if(rejected){
        return <Redirect to='/login'/>;
    }

    // Post was removed before operation, reload page to get latest posts.
    if(notFound){
        window.location.reload();
    }

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={'cardLikeBtn' + (like ? " liked" : "")} onClick={ handleClick }>
                {
                    like
                        ? <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        : <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                }
            </svg>
            { loading && <Loading/> }
            { error && <ErrorTip text="Network Error!"/> }
        </>
    );
};

export default React.memo(ContentBtnLike);