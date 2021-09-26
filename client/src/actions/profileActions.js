import axios from 'axios';

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile')
        .then(res =>
          dispatch({
             type: GET_PROFILE,
             payload: res.data
          })
        )
        .catch(err =>
          dispatch({
             type: GET_PROFILE,
             payload: {}
          })
        );
 };

 // Get profile by handle
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/handle/${handle}`)
        .then(res =>
          dispatch({
             type: GET_PROFILE,
             payload: res.data
          })
        )
        .catch(err =>
          dispatch({
             type: GET_PROFILE,
             payload: null
          })
        );
 };
 
 // Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
       .post('api/profile', profileData)
       .then(res => history.push('/dashboard'))
       .catch(err =>
          dispatch({
             type: GET_ERRORS,
             payload: err.response.data
          })
       );
 };

 // Add Article
 export const addArticle = (artData, history) => dispatch => {
     axios
      .post('/api/profile/article', artData)
      .then(res => history.push('/dashboard'))
      .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
 };

// Delete Article
export const deleteArticle = id => dispatch => {
    axios
     .delete(`/api/profile/article/${id}`)
     .then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    )
     .catch(err => 
           dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           })
       );
};

// Increase Article's Like Num
export const incArcNum = (id, handle) => dispatch => {
    axios
     .post(`/api/profile/article/${handle}/${id}`)
     .then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    )
     .catch(err => 
           dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           })
       );
};

// decrease Article's Hate Num
export const decArcNum = (id, handle) => dispatch => {
    axios
     .delete(`/api/profile/article/${handle}/${id}`)
     .then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    )
     .catch(err => 
           dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           })
       );
};

// Get all profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
     .get('/api/profile/all')
     .then(res => 
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    )
     .catch(err => 
           dispatch({
               type: GET_PROFILES,
               payload: null
           })
       );
};

 // Delete account & profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios
        .delete('api/profile')
        .then(res => 
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
        // // Remove token from localStorage
        localStorage.removeItem('jwtToken');
    }
}

// Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};