// import fetch from 'isomorphic-fetch';

export const REQUEST_INTERESTS = 'REQUEST_INTERESTS';
export const RECEIVE_INTERESTS = 'RECEIVE_INTERESTS';

export const REQUEST_CAREERS = 'REQUEST_CAREERS';
export const RECEIVE_CAREERS = 'RECEIVE_CAREERS';

export const REQUEST_CAREER = 'REQUEST_CAREER';
export const RECEIVE_CAREER = 'RECEIVE_CAREER';

// TEMP DATA
const INTEREST_DATA = [
  { id: 'interest1', name: 'Gaming' },
  { id: 'interest2', name: 'Baking' },
  { id: 'interest3', name: 'Swimming' }
];
const CAREER_DATA = [
  { id: 'career1', name: 'Biologist' },
  { id: 'career2', name: 'Molecular Biologist' },
  { id: 'career3', name: 'Biochemical Engineer' },
  { id: 'career4', name: 'Biomechanical Engineer' }
];

/**
    Fetching Interests
**/

export function requestInterests() {
  return {
    type: REQUEST_INTERESTS
  };
}

export function receiveInterests(interests) {
  return {
    type: RECEIVE_INTERESTS,
    interests
  };
}

function fetchInterests() {
  return dispatch => {
    dispatch(requestInterests());

    let getData = new Promise(function (resolve) {
      setTimeout(function () {
        resolve(INTEREST_DATA);
      }, 100);
    });

    return getData.then(interests => dispatch(receiveInterests(interests)));

    // return fetch('<insert-url>')
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveInterests(json)));
  };
}

// Public API
export function getInterests() {
  return (dispatch, getState) => {
    if (!getState().interests) {
      return dispatch(fetchInterests());
    }
  };
}

/**
    Fetching Careers based on interests
**/

export function requestCareers(interests) {
  return {
    type: REQUEST_CAREERS,
    interests: interests
  };
}

export function receiveCareers(interests, careers) {
  return {
    type: RECEIVE_CAREERS,
    interests: interests,
    careers: careers
  };
}

function fetchCareers(interests) {
  return dispatch => {
    dispatch(requestCareers(interests));

    let getData = new Promise(function (resolve) {
      setTimeout(function () {
        resolve(CAREER_DATA);
      }, 100);
    });

    return getData.then(careers => dispatch(receiveCareers(interests, careers)));

    // return fetch('<insert-url>')
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveInterests(json)));
  };
}

// Public API
export function getCareers(interests) {
  return (dispatch, getState) => {
    var careers = getState().careers;
    if (!careers[interests.join(',')]) {
      return dispatch(fetchCareers(interests));
    }
  };
}
