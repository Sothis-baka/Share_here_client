import React, { useState } from "react";

import getShowTime from "../utils/getShowTime";
import { DELETE_POST, TOGGLE_LIKE_POST } from "../graphql/mutations";

import ReplyArea from "./ReplyArea";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";

const LikeBtn = ({ postId, liked }) => {
    const [mutationSuccess, setMutationSuccess] = useState(true);
    const [toggleLike, { loading: mutationLoading, error: mutationError }] = useMutation(TOGGLE_LIKE_POST);

    const toggleLikePost = async () => {
        const { data } = await toggleLike({ variables: { toggleLikePostId: postId }});

        if(data?.toggleLike?.success){
            console.log("User liked a post");
        }else{
            setMutationSuccess(false);
        }
    }

    if(!mutationSuccess){
        return <Redirect to='/login'/>
    }

    return (
        <span className='center col'>
            <a href='#'>
                {
                    liked
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={"filled-heart"} viewBox="0 0 16 16" onClick={ toggleLikePost }>
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={"bi bi-heart"} viewBox="0 0 16 16" onClick={ toggleLikePost }>
                            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                }
            </a>
            {mutationLoading && <span>Loading...</span>}
            {mutationError && <span>Error :( Please try again</span>}
        </span>
    )
}

const DeleteBtn = ({ postId }) => {
    const [deletePost, { loading: mutationLoading, error: mutationError }] = useMutation(DELETE_POST);
    const [mutationSuccess, setMutationSuccess] = useState(true);

    const handleClick = async () => {
        const { data } = await deletePost({ variables: { deletePostPostId: postId }});

        if(data?.deletePost?.success){
            console.log("User deleted a post");
        }else {
            setMutationSuccess(false);
        }
    }

    if(!mutationSuccess){
        return <Redirect to='/login'/>;
    }

    return (
        <span className='center col'>
            <a href='#'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" onClick={handleClick}>
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </a>
            {mutationLoading && <span>Loading...</span>}
            {mutationError && <span>Error :( Please try again</span>}
        </span>
    );
}

class PostCard extends React.Component {
    constructor(props) {
        super(props);

        const post = props.post;

        this.state = {
            post,
            timeShowed: getShowTime(post.lastActive),
            showing: 0,
            expandTimeShowed: getShowTime(post.postAt)
        };
    }

    expand = () => {
        this.setState({
            showing: 1
        });
    }

    retrieve = () => {
        this.setState({
            showing: 0
        });
    }

    toggleReplies = () => {
        this.state.showing === 1
            ? this.setState({ showing: 2 })
            : this.setState({ showing: 1 });
    }

    render() {
        if(this.state.showing === 0){
            const { title, username } = this.state.post;

            return (
                <div className='postCard mod inactive' onClick={ this.expand }>
                    <p className='title'>{ title }</p>
                    <small className='username'>{ username }</small>
                    <small>{ this.state.timeShowed }</small>
                </div>
            );
        }

        const { title, content, username, id } = this.state.post;

        return (
            <div className='postCard mod'>
                <p className='title'>{ title }</p>
                <small className='username'>{ username }</small>
                <small>{ this.state.expandTimeShowed }</small>
                <p className='content'>{ content }</p>
                <p className='row'>
                    <LikeBtn liked={ this.props.liked } postId={this.state.post.id}/>
                    <span className='center col' onClick={ this.toggleReplies }>
                        <a href='#'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                            </svg>
                        </a>
                    </span>
                    {this.props.owned && <DeleteBtn postId={this.state.post.id}/>}
                    <span className='center col' onClick={ this.retrieve }>
                        <a href='#'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi" viewBox="0 0 16 16">
                                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>
                        </a>
                    </span>
                </p>
                {
                    this.state.showing === 2
                        ? <ReplyArea postId={ id }/>
                        : null
                }
            </div>
        );
    }
}

export default PostCard;