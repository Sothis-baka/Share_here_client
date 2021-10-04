import React, {useContext, useEffect, useRef} from "react";
import { useQuery } from "@apollo/client";
import throttle from 'lodash.throttle';

import { FETCH_POSTS_QUERY } from "../graphql/queries";
import ContentPostCard from "./ContentPostCard";
import FilterContext from "../utils/filterContext";
import {Redirect} from "react-router-dom";

class PostArea extends React.Component{
    constructor(props) {
        super(props);

        // throttle
        this.handleScroll = throttle(this.handleScroll,16);

        /* help to get scroll direction */
        this.lastScroll = 0;
        this.lock = false;
        this.state = { firstIndex: 0 };
    }

    componentDidMount() {
        document.getElementById('mainContent').addEventListener('scroll', this.handleScroll, { passive: true })
    }

    componentWillUnmount() {
        document.getElementById('mainContent').removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = (e) => {
        if(this.props.posts.length < 14){
            return;
        }
        // load this every time in case screen size changes
        const documentY = document.documentElement.offsetHeight;

        const currentScroll = e.target.scrollTop; // Get Current Scroll Value
        if (currentScroll > 0 && this.lastScroll <= currentScroll){
            // scroll down
            this.lastScroll = currentScroll;

            const lastOneY =  document.getElementById('LastOne')?.getBoundingClientRect().y;
            if(lastOneY && lastOneY < documentY){
                if(this.props.posts.length - 12> this.state.firstIndex) {
                    this.setState({ firstIndex: this.state.firstIndex + 2 });
                }else {
                    this.setState({ firstIndex: this.props.posts.length - 10 });
                }
            }
        }else{
            // scroll up
            this.lastScroll = currentScroll;

            const firstOneY =  document.getElementById('FirstOne')?.getBoundingClientRect().y;
            if(firstOneY && firstOneY > 0){
                if(this.state.firstIndex > 2) {
                    this.setState({ firstIndex: this.state.firstIndex - 2 });
                }else {
                    this.setState({ firstIndex: 0 });
                }
            }
        }
    }

    handleReset = () => {
        this.setState({ firstIndex: 0 });
    }

    render() {
        const posts = this.props.posts;
        const firstIndex = this.state.firstIndex;
        const lastIndex = posts.length < 10 ? posts.length : firstIndex + 10;

        return (
            <ul id='postArea'>
                { posts?.slice(firstIndex, lastIndex).map(p => {
                    if(p === posts[lastIndex-1]){
                        return <ContentPostCard post={ p } key={ p.id } id='LastOne'/>;
                    }else if(p === posts[firstIndex]){
                        return <ContentPostCard post={ p } key={ p.id } id='FirstOne'/>;
                    }
                    return <ContentPostCard post={ p } key={ p.id }/>;
                }) }
            </ul>
        );
    }
}

const ContentPostAreaInner = () => {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

    const postAreaRef = useRef(null);
    const context = useContext(FilterContext);

    useEffect(() => {
        if(postAreaRef.current) {
            postAreaRef.current.handleReset();
            document.getElementById('mainContent').scroll(0, 0);
        }
    })

    if(loading){
        return "loading";
    }

    if(error){
        return `ERROR! ${ error.message }`;
    }

    let posts = data?.getPosts;
    if(!posts){
        return null;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if(context.rule === 'post'){
        if(!user){
            return <Redirect to='./login'/>;
        }
        posts = posts.filter(p => p.username === user.username);
    }else if(context.rule === 'like'){
        if(!user){
            return <Redirect to='./login'/>;
        }
        posts = posts.filter(p => user?.likes?.includes(p.id));
    }

    if(context.keyword){
        posts = posts.filter(p => p.title.includes(context.keyword)||p.content.includes(context.keyword)||p.username.includes(context.keyword));
    }

    return(
        <PostArea ref={ postAreaRef } posts={ posts }/>
    )
}

class ContentPostArea extends React.Component{
    constructor(props) {
        super(props);

        this.state = { shouldRender: false };
    }

    // delay render, allow other components render first
    componentDidMount() {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => this.setState({ shouldRender: true }))
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.shouldRender !== nextState.shouldRender;
    }

    render() {
        return this.state.shouldRender ? <ContentPostAreaInner/> : "loading";
    }
}

export default ContentPostArea;