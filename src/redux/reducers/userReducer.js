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
      return {
        ...state,
        credentials: action.payload.currentUserData,
        profile: action.payload.userData,
        following: [
          ...state.following,
          {
            recipient: action.payload.userData.handle,
            sender: state.credentials.handle,
          },
        ],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        credentials: action.payload.currentUserData,
        profile: action.payload.userData,
        following: state.following.filter(
          (following) => following.recipient !== action.payload.userData.handle
        ),
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
