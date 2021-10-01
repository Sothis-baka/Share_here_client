import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
    mutation LoginMutation($loginUserInput: UserInput!) {
        login(userInput: $loginUserInput) {
            status
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
    mutation RegisterMutation($registerUserInput: UserInput!) {
        register(userInput: $registerUserInput) {
            status
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
    mutation CreatePostMutation($createPostPostInput: PostInput!) {
        createPost(postInput: $createPostPostInput) {
            status
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePostMutation($deletePostPostId: String!) {
        deletePost(postId: $deletePostPostId) {
            status
        }
    }
`;

const REPLY = gql`
    mutation ReplyMutation($replyPostId: String!, $replyContent: String!) {
        reply(postId: $replyPostId, content: $replyContent) {
            status
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
    mutation DeleteReplyMutation($deleteReplyReplyId: String!) {
        deleteReply(replyId: $deleteReplyReplyId) {
            status
        }
    }
`;

const TOGGLE_LIKE_POST = gql`
    mutation ToggleLikeMutation($toggleLikePostId: String!) {
        toggleLike(postId: $toggleLikePostId) {
            status
            like
        }
    }
`;

export { LOGIN_MUTATION, REGISTER_MUTATION, CREATE_POST, DELETE_POST, TOGGLE_LIKE_POST, REPLY, DELETE_REPLY };