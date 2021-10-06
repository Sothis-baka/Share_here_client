import React, { useState } from "react";
import { useMutation } from '@apollo/client';

import { CREATE_POST } from "../graphql/mutations";
import { Redirect } from "react-router-dom";
import Loading from "./Loading";
import ErrorTip from "./ErrorTip";

const ContentPostInput = () => {
    const [postInput, setPostInput] = useState({
        title: "",
        content: "",
        titleValid: true,
        contentValid: true,
        authenticated: true
    });

    const [createPost, { loading, error }] = useMutation(
        CREATE_POST,
        {
            onCompleted: ({ createPost }) => {
                if(createPost?.status === '201'){
                    // Created
                }else if(createPost?.status === '401'){
                    // Rejected, not authenticated
                    setPostInput({ ...postInput, authenticated: false });
                }
            },
            refetchQueries: ['getPosts']
        }
    );

    const handleChange = (e) => {
        const newPostInput = { ...postInput };
        const value = e.target.value;

        // update input value and validity
        if(e.target.name === 'title'){
            newPostInput.title = value;
            if(newPostInput.titleValid){
                if(value.length > 50){
                    newPostInput.titleValid = false;
                }
            }else{
                if(value.length <= 50){
                    newPostInput.titleValid = true;
                }
            }
        }else {
            newPostInput.content = value;
            if(newPostInput.contentValid){
                if(value.length > 500){
                    newPostInput.contentValid = false;
                }
            }else{
                if(value.length <= 500){
                    newPostInput.contentValid = true;
                }
            }
        }

        // save in state
        setPostInput(newPostInput);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // debounce and avoid empty input
        if(loading || !postInput.title || !postInput.content || !postInput.titleValid || !postInput.contentValid){
            return;
        }

        if(!postInput.title.trim() || !postInput.content.trim()){
            return;
        }

        await createPost({
           variables: {
               createPostPostInput: { title: postInput.title, content: postInput.content }
           }
        });
    }

    if(!postInput.authenticated){
        return <Redirect to='./login'/>;
    }

    return (
        <form id='postInput' className='mod' onSubmit={ handleSubmit }>
            <div className='left'>
                <div>
                    <input id='postTitleInput' className='inputMod' type='text' name='title' placeholder='Give a title to your post' onChange={ handleChange }/>
                    <small>{ postInput.titleValid ? null : "How can you come up with such a long title!" }</small>
                </div>
                <div>
                    <textarea className='inputMod' name='content' placeholder='Share your thoughts' onChange={ handleChange }/>
                    <small>{ postInput.contentValid ? null : "Wow so much to say, split them into comment!" }</small>
                </div>
            </div>
            <div className='right'>
                <input id='postBtn' className={'homeBtn' + (loading ? " disabled" : "")} type='submit' value='Post'/>
            </div>
            { loading ? <Loading/> : null }
            { error ? <ErrorTip text="Network Error!"/>: null }
        </form>
    );
};

export default ContentPostInput;