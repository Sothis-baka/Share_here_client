import React from "react";

import ContentBtnLike from "./ContentBtnLike";
import ContentReplies from "./ContentReplies";
import ContentBtnDelete from "./ContentBtnDelete";

class ContentPostCardExpansion extends React.Component{
    constructor(props) {
        super(props);

        this.updateLike = this.updateLike.bind(this);

        this.state = {
            like: false,
            showReplies: false,
            canDelete: false
        };
    }

    componentDidMount() {
        const newState = { ...this.state };

        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            if(user.likes?.includes(this.props.postInfo.id))
                newState.like = true;
            if(user.username === this.props.postInfo.username)
                newState.canDelete = true;
        }

        this.setState(newState);
    }

    updateLike = () => {
        this.setState({ like: !this.state.like });
    }

    handleReply = () => {
        this.setState( { showReplies: !this.state.showReplies } );
    }

    render() {
        return (
            <>
                <div id='postCardBtns'>
                    <div>
                        <ContentBtnLike like={ this.state.like } postId={ this.props.postInfo.id } updateLike={ this.updateLike }/>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={'cardReplyBtn' + (this.state.showReplies ? " showing":"")} onClick={ this.handleReply }>
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className='cardFolderBtn' onClick={ this.props.handleExpand }>
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                        </svg>
                    </div>
                    { this.state.canDelete ? <ContentBtnDelete postId={ this.props.postInfo.id }/> : null }
                </div>
                { this.state.showReplies ? <ContentReplies postId={ this.props.postInfo.id }/> : null }
            </>
        );
    }
}

export default ContentPostCardExpansion;