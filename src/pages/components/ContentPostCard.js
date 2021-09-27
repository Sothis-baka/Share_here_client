import React from "react";

import ContentPostCardExpansion from "./ContentPostCardExpansion";
import getDisplayTime from "../utils/getDisplayTime";

class ContentPostCard extends React.Component{
    constructor(props) {
        super(props);

        this.state = { expand: false };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.post.id !== nextProps.post.id || this.props.id !== nextProps.id)
            return true;
        if(this.state.expand !== nextState.expand)
            return true;

        return false;
    }

    handleExpand = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    render() {
        const post = this.props.post;
        const { expand } =  this.state;

        return (
            <div className={'mod postCard' + (expand?" expand":"")} onClick={ expand ? null : this.handleExpand } id={ this.props.id }>
                <p className='cardTitle'>{ post.title }</p>
                <p><span className='cardUsername'>{ post.username }</span><span className='cardDate'>{ getDisplayTime(post.lastActive) }</span></p>
                { expand && <ContentPostCardExpansion postId={ post.id } handleExpand={ this.handleExpand }/> }
            </div>
        );
    }
}

export default ContentPostCard;