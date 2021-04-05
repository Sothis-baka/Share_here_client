import React, { useState } from "react";
import getShowTime from "../utils/getShowTime";
import {useMutation, useQuery} from "@apollo/client";
import { FETCH_REPLIES_QUERY } from "../graphql/queries";
import { REPLY, DELETE_REPLY } from "../graphql/mutations";
import { Redirect } from "react-router-dom";

const ReplyInput = ({ postId }) => {
    const [formState, setFormState] = useState({
        content: '',
        invalid: false
    });

    const [mutationSuccess, setMutationSuccess] = useState(true);
    const [reply, { loading: mutationLoading, error: mutationError }] = useMutation(REPLY);

    const handleChange = (e) => {
        const content = e.target.value;
        const cpyState = {...formState};

        cpyState.content = content;

        if(!formState.invalid && content.length > 200){
            cpyState.invalid = true;
        }

        if(formState.invalid && content.length <= 200){
            cpyState.invalid = false;
        }

        setFormState(cpyState);
    }

    const handleClick = async () => {
        if(formState.content.trim() === '' || formState.invalid){
            return;
        }

        const { data } = await reply({ variables: { replyPostId: postId, replyContent:formState.content }});

        if(data?.reply?.success){
            console.log('User created a reply.')
        }else{
            setMutationSuccess(false);
        }
    }

    if(!mutationSuccess){
        return <Redirect to='/login'/>;
    }

    return(
        <div className='replyInput row'>
            <div className='col-xl-10 col-9'>
                <div className={'row ' + (formState.invalid && 'TextAreaInvalid')}>
                    <textarea placeholder='Send a friendly reply' onChange={ handleChange }/>
                    <small className='toolTip'>Too many words at one time</small>
                </div>
            </div>
            <div className='col-xl-2 col-3'>
                <button className='inputBtn replyBtn btn-1' onClick={ handleClick }>
                    <span>Reply</span>
                </button>
            </div>
            { mutationLoading && <p>Loading...</p> }
            { mutationError && <p>Error :( Please try again</p> }
        </div>
    );
}

const ReplyCard = ({ reply, curUsername }) => {
    const { id, username, content, replyAt } = reply;

    const [mutationSuccess, setMutationSuccess] = useState(true);
    const [deleteReply, { loading: mutationLoading, error: mutationError }] = useMutation(DELETE_REPLY);

    const handleDelete = async () => {
        const { data } = await deleteReply({ variables: { deleteReplyReplyId: id }});

        if(data?.deleteReply?.success){
            console.log('User deleted a reply.')
        }else{
            setMutationSuccess(false);
        }
    }

    if(!mutationSuccess){
        return <Redirect to='/login'/>;
    }

    return (
        <div className='replyCard'>
            <hr/>
            <small className='username'>{username}</small>
            <p className='replyContent'>{content}</p>
            <small className='replyAt'>{getShowTime(replyAt)}</small>
            {curUsername === username && <small className='deleteReplyBtn' onClick={handleDelete}>delete</small>}
            { mutationLoading && <p>Loading...</p> }
            { mutationError && <p>Error :( Please try again</p> }
        </div>
    );
};

const ReplyArea = ({ postId }) => {
    const {
        loading,
        error,
        data
    } = useQuery(FETCH_REPLIES_QUERY, {
        variables: { postId },
        pollInterval: 500
    });

    if(loading) return (
        <div className='replyArea'>
            'Loading...'
        </div>
    );

    if(error) return (
        <div className='replyArea'>
            `ERROR! ${error.message}`
        </div>
    );

    const user = JSON.parse(localStorage.getItem('user'));

    return(
        <div className='replyArea'>
            <ReplyInput postId={ postId }/>
            <div className='replies'>
                {data?.getReplies?.map(reply => <ReplyCard reply={ reply } curUsername={ user.username } key={reply.id}/>)}
            </div>
        </div>
    );
};

export default ReplyArea;