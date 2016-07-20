import fetch from 'isomorphic-fetch';

export const SELECT_INTERESTS = 'SELECT_INTERESTS';
export const DESELECT_INTERESTS = 'DESELECT_INTERESTS';

export const REQUEST_INTERESTS = 'REQUEST_INTERESTS';
export const RECEIVE_INTERESTS = 'RECEIVE_INTERESTS';

export const REQUEST_CAREERS = 'REQUEST_CAREERS';
export const RECEIVE_CAREERS = 'RECEIVE_CAREERS';

export const REQUEST_CAREER_DATA = 'REQUEST_CAREER_DATA';
export const RECEIVE_CAREER_DATA = 'RECEIVE_CAREER_DATA';

const ENDPOINT = "https://aum42oxtch.execute-api.us-west-2.amazonaws.com/techstage";
const INTERESTS_PATH = "/interests";
const CAREERS_PATH = "/careers";
const ROLEMODEL_PATH = "/rolemodels";

const INTERESTS_DELIM = ';';

/**
    Caching API responses
**/

export function getInterestsId(interests) {
  return interests && interests.join(INTERESTS_DELIM);
}

// Lookup from list of interests to career objects
var careersCache = {};
function getCachedCareers(interests) {
  return careersCache[getInterestsId(interests)];
}
function setCachedCareers(interests, careers) {
  var interestsId = getInterestsId(interests);
  careersCache[interestsId] = {
    id: interestsId,
    list: careers
  };
}

// Lookup from careerId to careerData
var careerDataCache = {};
function getCachedCareerData(careerId) {
  return careerDataCache[careerId];
}
function setCachedCareerData(careerId, careerData) {
  careerData.id = careerId;
  careerDataCache[careerId] = careerData;
}


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
    data: interests
  };
}

function fetchInterests() {
  return dispatch => {
    dispatch(requestInterests());
    return fetch(ENDPOINT + INTERESTS_PATH)
      .then(response => {
        if (response.status !== 200) { throw "Unexpected Response: ", + response.status; }
        return response.json();
      })
      .then(json => dispatch(receiveInterests(json)));
  };
}

// Public API
export function getInterests() {
  return (dispatch, getState) => {
    var interests = getState().interests;
    if (!interests || !interests.data) {
      return dispatch(fetchInterests());
    }
    return Promise.resolve();
  };
}

/**
    Fetching Careers based on interests
**/

export function requestCareers() {
  return {
    type: REQUEST_CAREERS
  };
}

export function receiveCareers(careers) {
  return {
    type: RECEIVE_CAREERS,
    data: careers
  };
}

function fetchCareers(interests) {
  return dispatch => {

    // See if we already have a cached response:
    function returnCachedData() {
      var cache = getCachedCareers(interests);
      if (cache) {
        dispatch(receiveCareers(cache));
        return true;
      }
    }
    if (returnCachedData()) {
      return Promise.resolve();
    }

    // Otherwise, need to fetch from server
    dispatch(requestCareers());

    return fetch(ENDPOINT + CAREERS_PATH + '?interest=' + encodeURIComponent(interests[0]))
      .then(response => {
        if (response.status !== 200) { throw "Unexpected Response: ", + response.status; }
        return response.json();
      })
      .then(json => (json && json.careers && json.careers.map(elem => ({ name: elem, id: elem }))) || [])
      .then(careers => {
        setCachedCareers(interests, careers);
        returnCachedData();
      });
  };
}

// Public API
export function getCareers() {
  return (dispatch, getState) => {
    var interests = (getState().interests && getState().interests.selected) || [];
    var careers = getState().careers;
    if (!careers || careers.id !== getInterestsId(interests)) {
      return dispatch(fetchCareers(interests));
    }
    return Promise.resolve();
  };
}

/**
    Fetching Data for a particular career
**/

export function requestCareerData() {
  return {
    type: REQUEST_CAREER_DATA
  };
}

export function receiveCareerData(careerData) {
  return {
    type: RECEIVE_CAREER_DATA,
    data: careerData
  };
}

function fetchCareerData(careerId) {
  return dispatch => {

    // See if we already have a cached response:
    function returnCachedData() {
      var cache = getCachedCareerData(careerId);
      if (cache) {
        dispatch(receiveCareerData(cache));
        return true;
      }
    }
    if (returnCachedData()) {
      return Promise.resolve();
    }

    // Otherwise, we need to fetch from the server
    dispatch(requestCareerData());

    return fetch(ENDPOINT + ROLEMODEL_PATH + '?career=' + encodeURIComponent(careerId))
      .then(response => response.json())
      .then(careerData => {
        if (careerData) {
          var rolemodels = careerData.rolemodels;
          rolemodels.forEach(function (rolemodel) {
            rolemodel.id = rolemodel.firstname + rolemodel.lastname;
          });
          setCachedCareerData(careerId, careerData);
          returnCachedData();
        }
      });
  };
}

// Public API
export function getCareerData(careerId) {
  return (dispatch, getState) => {
    var careerData = getState().careerData;
    if (!careerData || careerData.id !== careerId) {
      return dispatch(fetchCareerData(careerId));
    }
    return Promise.resolve();
  };
}





/**
    Initialising state
**/

export function selectInterests(interestIds, replace) {
  return {
    type: SELECT_INTERESTS,
    ids: interestIds,
    replace: replace
  };
}

export function deselectInterests(interestIds) {
  return {
    type: DESELECT_INTERESTS,
    ids: interestIds
  };
}

export function initState(query) {
  return dispatch => {
    var interestIds = query.interests ? query.interests.split(INTERESTS_DELIM) : [];

    return dispatch(getInterests())
      .then(() => dispatch(selectInterests(interestIds, true)))
      .then(() => {
        if (interestIds.length > 0) {
          return dispatch(getCareers());
        }
      })
      .then(() => {
        if (query.career) {
          return dispatch(getCareerData(query.career));
        }
      });
  };
}
