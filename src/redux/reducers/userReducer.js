import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
  MARK_NOTIFICATIONS_READ,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SET_PROFILE,
  UNSET_PROFILE,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  profile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notif) => (notif.read = true));
      return {
        ...state,
      };
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      let index = state.credentials.findIndex(
        (user) => user.userId === action.payload.userData.userId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case SET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case UNSET_PROFILE:
      return {
        ...state,
        profile: {},
      };
    default:
      return state;
  }
}
