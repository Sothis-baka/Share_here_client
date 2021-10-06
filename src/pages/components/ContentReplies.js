import React from "react";
import { useQuery } from "@apollo/client";

import { FETCH_REPLIES_QUERY } from "../graphql/queries";
import ContentReplyInput from "./ContentReplyInput";
import ContentSingleReply from "./ContentSingleReply";
import Loading from "./Loading";
import ErrorTip from "./ErrorTip";

const ContentRepliesInner = ({ postId }) => {
    const { loading, error, data } = useQuery(FETCH_REPLIES_QUERY, {
        variables: { postId }
    });

    if(loading){
        return <Loading/>;
    }

    if(error){
        return <ErrorTip text="Network Error!"/>;
    }

    const replies = data?.getReplies;

    if(!replies){
        return null;
    }

    return (
        <ul>
            { replies.map(r => <ContentSingleReply key={ r.id } r={ r }/>) }
        </ul>
    );
};

class ContentReplies extends React.PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            loadReplies: false
        };
    }

    componentDidMount() {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => this.setState({ loadReplies: true }))
        })
    }

    render() {
        return (
            <div className='replyArea'>
                <ContentReplyInput postId={ this.props.postId }/>
                { this.state.loadReplies ? <ContentRepliesInner postId={ this.props.postId }/> : null }
            </div>
        )
    }


}

export default ContentReplies;