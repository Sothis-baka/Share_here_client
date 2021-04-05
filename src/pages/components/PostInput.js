import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_POST } from "../graphql/mutations";
import {Redirect} from "react-router-dom";

const PostInput = () => {
    const [formState, setFormState] = useState({
            title: '',
            content: '',
            titleInvalid: false,
            contentInvalid: false,
            createFailedMessage: false
    });

    const [createPost, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_POST);

    const handleChange = (event) => {
        const tValue = event.target.value;
        const tLength = tValue.length;

        const cpyState = { ...formState };

        if(event.target.name === 'title'){
            cpyState.title = event.target.value;

            if(!formState.titleInvalid && tLength > 60){
                // TODO: show invalid message
                cpyState.titleInvalid = true;
            }

            if(formState.titleInvalid && tLength <= 60){
                cpyState.titleInvalid = false;
            }
        }else{
            cpyState.content = event.target.value;

            if(!formState.contentInvalid && tLength > 500){
                // TODO: show invalid message
                cpyState.contentInvalid = true;
            }

            if(formState.contentInvalid && tLength <= 500){
                cpyState.contentInvalid = false;
            }
        }

        setFormState(cpyState);
    };

    const handleClick = async () => {
        if(formState.title.trim() === '' || formState.content.trim() === '' || formState.titleInvalid || formState.contentInvalid){
            return;
        }

        const { data } = await createPost({ variables: { "createPostPostInput": {
            "title": formState.title,
            "content": formState.content
        }}});

        if(data?.createPost?.success){
            console.log("User created a post");
        }else{
            setFormState({ createFailedMessage: true });
        }
    };

    if(formState.createFailedMessage)
        return <Redirect to='/login'/>;

    return(
        <div id='postInput' className='mod row'>
            <div className='col-xl-10 col-9'>
                <div className={'row ' + (formState.titleInvalid && 'TitleInvalid')}>
                    <input name='title' type='text' placeholder='Give a title to your post' onChange={ handleChange }/>
                    <small className='toolTip'>How can u come up with such a long title?</small>
                </div>
                <div className={'row ' + (formState.contentInvalid && 'TextAreaInvalid')}>
                    <textarea name='content' placeholder='Share your thoughts' onChange={ handleChange }/>
                    <small className='toolTip'>Wow so much to say, split them into comment</small>
                </div>
            </div>

            <div className='col-xl-2 col-3'>
                <button id='postBtn' className='inputBtn btn-1' onClick={ handleClick }>
                    <span>Post</span>
                </button>
            </div>

            { mutationLoading && <p>Loading...</p> }
            { mutationError && <p>Error :( Please try again</p> }
        </div>
    );
}

export default PostInput;