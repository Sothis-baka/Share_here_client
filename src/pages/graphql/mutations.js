import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
    mutation Mutation($loginUserInput: UserInput!) {
        login(userInput: $loginUserInput) {
            success
            message
            user {
                id
                username
                token
                joinDate
                posts
                likes
            }
        }
    }
`;

const REGISTER_MUTATION = gql`
    mutation Mutation($registerUserInput: UserInput!) {
        register(userInput: $registerUserInput) {
            success
            message
            user {
                id
                username
                token
                joinDate
                posts
                likes
            }
        }
    }    
`;

const CREATE_POST = gql`
    mutation Mutation($createPostPostInput: PostInput!) {
        createPost(postInput: $createPostPostInput) {
            success
            message
        }
    }
`;

const DELETE_POST = gql`
    mutation Mutation($deletePostPostId: String!) {
        deletePost(postId: $deletePostPostId) {
            success
            message
        }
    }
`;

const REPLY = gql`
    mutation Mutation($replyPostId: String!, $replyContent: String!) {
        reply(postId: $replyPostId, content: $replyContent) {
            success
            message
            reply {
                id
                username
                content
                replyAt
                postId
            }
        }
    }
`;

const DELETE_REPLY = gql`
    mutation Mutation($deleteReplyReplyId: String!) {
        deleteReply(replyId: $deleteReplyReplyId) {
            success
            message
        }
    }
`;

const TOGGLE_LIKE_POST = gql`
    mutation Mutation($toggleLikePostId: String!) {
        toggleLike(postId: $toggleLikePostId) {
            success
            message
        }
    }
`;

export { LOGIN_MUTATION, REGISTER_MUTATION, CREATE_POST, DELETE_POST, TOGGLE_LIKE_POST, REPLY, DELETE_REPLY };