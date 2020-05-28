import {
  SET_POSTS,
  SET_POST,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  CREATE_POST,
  SUBMIT_COMMENT,
  GET_NEW_USERS,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  newusers: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case LIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      return {
        ...state,
        post: { ...state.post, likeCount: state.post.likeCount + 1 },
      };

    case UNLIKE_POST:
      let index4 = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index4] = action.payload;
      return {
        ...state,
        post: { ...state.post, likeCount: state.post.likeCount - 1 },
      };
    case DELETE_POST:
      let index2 = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(index2, 1);
      return {
        ...state,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SUBMIT_COMMENT:
      let index3= state.posts.findIndex(
        (post) => post.postId === action.payload.comment.postId
      );
      state.posts[index3] = action.payload.post;
      return {
        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount + 1,
          comments: [...state.post.comments, action.payload.comment],
        },
      };
    case GET_NEW_USERS:
      return {
        ...state,
        newusers: action.payload,
      };
    default:
      return state;
  }
}
