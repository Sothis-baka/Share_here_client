import React from "react";
import { useQuery } from "@apollo/client";
import throttle from 'lodash.throttle';

import { FETCH_POSTS_QUERY } from "../graphql/queries";
import ContentPostCard from "./ContentPostCard";

class PostArea extends React.Component{
    constructor(props) {
        super(props);

        // throttle
        this.handleScroll = throttle(this.handleScroll, 20);

        /* help to get scroll direction */
        this.lastScroll = 0;
        this.state = { firstIndex: 0 };
    }

    componentDidMount() {
        document.getElementById('mainContent').addEventListener('scroll', this.handleScroll, { passive: true })
    }

    componentWillUnmount() {
        document.getElementById('mainContent').removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = (e) => {
        // load this every time in case screen size changes
        const documentY = document.documentElement.offsetHeight;

        const currentScroll = e.target.scrollTop; // Get Current Scroll Value
        if (currentScroll > 0 && this.lastScroll <= currentScroll){
            // scroll down
            this.lastScroll = currentScroll;

            const lastOneY =  document.getElementById('LastOne').getBoundingClientRect().y;
            if(lastOneY < documentY){
                if(this.props.posts.length - 10 > this.state.firstIndex) {
                    this.setState({ firstIndex: this.state.firstIndex + 2 });
                }else {
                    this.setState({ firstIndex: this.props.posts.length - 8 });
                }
            }
        }else{
            // scroll up
            this.lastScroll = currentScroll;

            const firstOneY =  document.getElementById('FirstOne').getBoundingClientRect().y;
            if(firstOneY > 0){
                if(this.state.firstIndex > 2) {
                    this.setState({ firstIndex: this.state.firstIndex - 2 });
                }else {
                    this.setState({ firstIndex: 0 });
                }
            }
        }
    }

    render() {
        const posts = this.props.posts;
        const firstIndex = this.state.firstIndex;
        const lastIndex = posts.length < 8 ? posts.length : firstIndex + 8;

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

const ContentPostAreaInner = ({ username }) => {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

    if(loading){
        return "loading";
    }

    if(error){
        return `ERROR! ${ error.message }`;
    }

    const posts = data?.getPosts;
    if(!posts){
        return null;
    }

    return(
        <PostArea posts={ posts } username={ username }/>
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
        if(this.state.shouldRender !== nextState.shouldRender)
            return true;
        if(this.props.username !== nextProps.username)
            return true;

        return false;
    }

    render() {
        return this.state.shouldRender ? <ContentPostAreaInner username={ this.props.username }/> : "loading";
    }
}

export default ContentPostArea;