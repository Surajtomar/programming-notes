import {
  CLEAR_APP_STATE,
  CLEAR_POST_STATE,
  DELETE_POST_FROM_SEARCH_POST_DATA,
  IS_AUTHTHENTICATED,
  IS_EMAIL_VERIFIED,
  IS_SIGNIN,
  SET_EDIT_POST_DATA,
  SET_IS_LOADING,
  SET_IS_PRIVATE,
  SET_PUBLIC_POST_DATA,
  SET_SEARCH_POST_DATA,
  SET_USER,
  SET_USER_BIN_POST,
  SET_USER_POST,
  SET_VIEW_POST_DATA,
  UPDATE_EDITOR_STATE,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_ID,
  UPDATE_POST_SAMPLE,
  UPDATE_POST_TITLE,
} from './action.type'

// Editior
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js'

const appInitialState = {
  isAuthenticated: false,
  isEmailVerified: false,
  isSignIn: false,
  user: {},
  post: {},
  BinPostData: {},
  viewPostData: {},
  editPostData: {},
  searchPostData: {},
  searchPublicData: {},
  isLoading: false,
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }
    case IS_AUTHTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    case IS_EMAIL_VERIFIED:
      return {
        ...state,
        isEmailVerified: action.payload,
      }
    case IS_SIGNIN:
      return {
        ...state,
        isSignIn: action.payload,
      }
    case SET_USER_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      }
    case SET_USER_BIN_POST:
      return {
        ...state,
        BinPostData: action.payload,
        isLoading: false,
      }
    case SET_VIEW_POST_DATA:
      return {
        ...state,
        viewPostData: action.payload,
      }

    case SET_EDIT_POST_DATA:
      return { ...state, editPostData: action.payload }

    case SET_SEARCH_POST_DATA:
      return { ...state, searchPostData: action.payload }

    case DELETE_POST_FROM_SEARCH_POST_DATA: {
      const { searchPostData } = state
      return {
        ...state,
        searchPostData: searchPostData.filter(
          (searchPost) => searchPost.postId != action.payload,
        ),
      }
    }
    case SET_PUBLIC_POST_DATA:
      return { ...state, searchPublicData: action.payload }

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload }

    case CLEAR_APP_STATE:
      return appInitialState

    default:
      return state
  }
}

export const addPostReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: action.payload,
      }

    case UPDATE_POST_TITLE:
      return {
        ...state,
        postTitle: action.payload,
      }

    case UPDATE_POST_SAMPLE:
      return {
        ...state,
        postSample: action.payload,
      }
    case UPDATE_POST_CATEGORY:
      return {
        ...state,
        postCategory: action.payload,
      }
    case CLEAR_POST_STATE:
      return action.payload
    case UPDATE_POST_ID:
      return {
        ...state,
        postId: action.payload,
      }
    case SET_IS_PRIVATE:
      return {
        ...state,
        isPrivate: action.payload,
      }

    default:
      return state
  }
}

export const editPostReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: action.payload,
      }

    case UPDATE_POST_TITLE:
      return {
        ...state,
        postTitle: action.payload,
      }

    case UPDATE_POST_SAMPLE:
      return {
        ...state,
        postSample: action.payload,
      }

    case UPDATE_POST_CATEGORY:
      return {
        ...state,
        postCategory: action.payload,
      }

    case CLEAR_POST_STATE:
      return action.payload

    case SET_IS_PRIVATE:
      return {
        ...state,
        isPrivate: action.payload,
      }

    case SET_EDIT_POST_DATA: {
      const htmlPostBody = convertFromHTML(action.payload.postBody)
      const editorStateTemp = ContentState.createFromBlockArray(
        htmlPostBody.contentBlocks,
        htmlPostBody.entityMap,
      )
      const editorState = EditorState.createWithContent(editorStateTemp)

      return {
        ...state,
        postId: action.payload.postId,
        postTitle: action.payload.postTitle,
        postSample: action.payload.postSample,
        postCategory: action.payload.postCategory,
        isPrivate: action.payload.isPrivate,
        editorState: editorState,
      }
    }

    default:
      return state
  }
}
