const HOSTNAME = 'http://localhost:8080';

export const SIGNUP = `${HOSTNAME}/user/signup`;
export const LOGIN = `${HOSTNAME}/user/login`;
export const GET_YEARS = `${HOSTNAME}/posts/years`;
export const ADD_POST = `${HOSTNAME}/posts/add`;
export const PREVIEW_POSTS = `${HOSTNAME}/posts/preview/all`;
export const POST_BY_ID = `${HOSTNAME}/posts/id/`
export const ADD_COMMENT = `${HOSTNAME}/posts/comments/add`;
export const GET_COMMENT = `${HOSTNAME}/posts/comments/get`;
export const DELETE_COMMENT = `${HOSTNAME}/posts/comments/delete`;