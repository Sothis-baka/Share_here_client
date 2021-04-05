import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../graphql/queries";
import PostInput from "./PostInput";
import PostCard from "./PostCard";
import React from "react";

// TODO: no result component
const MainPage = ({ showing, keyword, username }) => {
    const {
        loading,
        error,
        data
    } = useQuery(FETCH_POSTS_QUERY, {
        pollInterval: 500
    });

    if(loading) return (
        <div id='mainPage' className='col-lg-8 col-md-9 col-12'>
            <div id='mainPageWrapper'>
                <div className='mod'>'Loading...'</div>
            </div>
        </div>
    );

    if(error) return (
        <div id='mainPage' className='col-lg-8 col-md-9 col-11'>
            <div id='mainPageWrapper'>
                <div className='mod'>`ERROR! ${ error.message }`</div>
            </div>
        </div>
    );

    return(
        <div id='mainPage' className='col-lg-8 col-md-9 col-11'>
            <div id='mainPageWrapper'>
                <PostInput/>
                {
                    <div id='posts'>
                        {
                            data?.getPosts?.filter(
                                (post) => {
                                    return post.title.includes(keyword.title)
                                        && post.content.includes(keyword.content)
                                        && post.username.includes(keyword.username)
                                        && (
                                            showing === 1
                                                ? post.username === username
                                                : showing === 2
                                                    ? post.likes.includes(username)
                                                    : true
                                        );
                                }
                            ).map(
                                (post) => {
                                    let owned = false, liked = false;

                                    if(username === post.username)
                                        owned = true;

                                    if(post.likes.includes(username))
                                        liked = true;

                                    return <PostCard post={ post } key={post.id} owned={ owned } liked={ liked }/>;
                                }
                            )
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default MainPage;