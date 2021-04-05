import { gql } from "@apollo/client";

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            title
            content
            username
            postAt
            lastActive
            likes
        }
    }
`;

const FETCH_REPLIES_QUERY = gql`
    query Query($postId: String) {
        getReplies(postId: $postId) {
            id
            username
            content
            replyAt
            postId
        }
    }
`;

export { FETCH_POSTS_QUERY, FETCH_REPLIES_QUERY };