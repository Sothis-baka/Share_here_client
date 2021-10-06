import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REPLY } from "../graphql/mutations";
import Loading from "./Loading";
import ErrorTip from "./ErrorTip";
import {Redirect} from "react-router-dom";

const ContentReplyInput = ({ postId }) => {
    const [replyInput, setReplyInput] = useState({
        content: "",
        contentValid: true,
        authenticated: true,
        needRefresh: false
    });

    const [reply, { loading, error }] = useMutation(
        REPLY,
        {
            onCompleted: async ({ reply }) => {
                if(reply?.status === '201'){
                    // Created
                }else if(reply?.status === '401'){
                    // Rejected, not authenticated
                    setReplyInput({ ...replyInput, authenticated: false });
                }else if(reply?.status === '404'){
                    // Can't find the post, refresh the page
                    setReplyInput({ ...replyInput, needRefresh: true });
                }
            },
            refetchQueries: ['getReplies']
        }
    );

    const handleChange = (e) => {
        const newReplyInput = { ...replyInput };
        const value = e.target.value;

        if(newReplyInput.contentValid){
            if(value.length > 400){
                newReplyInput.contentValid = false;
            }
        }else {
            if(value.length <= 400){
                newReplyInput.contentValid = true;
            }
        }

        newReplyInput.content = value;

        setReplyInput(newReplyInput);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // debounce and avoid empty input
        if(loading || !replyInput.content || !replyInput.contentValid){
            return;
        }

        if(!replyInput.content.trim()){
            return;
        }

        await reply({
            variables: {
                replyPostId: postId, replyContent: replyInput.content
            }
        });
    }

    if(!replyInput.authenticated){
        return <Redirect to='./login'/>;
    }

    if(replyInput.needRefresh){
        window.location.reload();
    }

    return (
        <form className='replyInput' onSubmit={ handleSubmit }>
            <div className='left'>
                <textarea className='inputMod' name='content' placeholder='Send a friendly reply' onChange={ handleChange } autoFocus={ true }/>
                <small>{ replyInput.contentValid ? null : "Wow so much to say, split them into comment!" }</small>
            </div>
            <div className='right'>
                <input className={'homeBtn replyBtn' + (loading ? " disabled" : "")} type='submit' value='Reply'/>
            </div>
            { loading ? <Loading/> : null }
            { error ? <ErrorTip text="Network Error!"/>: null }
        </form>
    );
}

export default ContentReplyInput;