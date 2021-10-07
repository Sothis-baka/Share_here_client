import React from "react";

import ContentPostCardExpansion from "./ContentPostCardExpansion";

import getDisplayTime from "../utils/getDisplayTime";

class ContentPostCard extends React.Component{
    constructor(props) {
        super(props);

        this.state = { expand: false };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(this.props.post.id === nextProps.post.id && this.props.id === nextProps.id && this.state.expand === nextState.expand);
    }

    handleExpand = () => {
        this.setState({ expand: !this.state.expand });
    }

    /* manually scroll event for timeline click */
    handleScroll = (e) => {
        const mainContent = document.getElementById('mainContent');

        let remain = e.target.getBoundingClientRect().y - document.documentElement.offsetHeight / 2;
        let down = true;
        if(remain < 0){
            remain = -remain;
            down = false;
        }

        const move = () => {
            if(remain > 10){
                mainContent.scrollBy({ top: down?10:-10, behavior: "auto" });
                remain -= 10;
            }else {
                mainContent.scrollBy({ top: down?remain:-remain, behavior: "auto" });
                remain = 0;
            }

            if(remain){
                window.requestAnimationFrame(()=>{
                    move();
                });
            }
        }

        window.requestAnimationFrame(() => {
            move();
        });

        e.stopPropagation();
    }

    render() {
        const post = this.props.post;
        const id = this.props.id;
        const expand =  this.state.expand;

        return (
            <div className={'mod postCard' + (expand?" expand":"")} onClick={ expand ? null : this.handleExpand } id={ id }>
                <p className='cardTitle'>{ post.title }</p>
                <p><span className='cardUsername'>{ post.username }</span><span className='cardDate'>{ getDisplayTime(expand ? post.postAt : post.lastActive) }</span></p>
                <div className='timeLine' onClick={ this.handleScroll }/>
                <div className={ 'lineOfTimeLine' + (id ? " "+id : "") }/>
                { expand &&
                    <>
                        <p className='cardContent'>{ post.content }</p>
                        <ContentPostCardExpansion postInfo={ { id: post.id, username: post.username } } handleExpand={ this.handleExpand }/>
                    </>
                }
            </div>
        );
    }
}

export default ContentPostCard;