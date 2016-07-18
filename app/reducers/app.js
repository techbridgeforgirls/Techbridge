import { get } from '../utils/config';

const initialState = {
  error: {
    code: 200
  },
  language: 'en',
  selectedGroup: 0
};

const getLanguage = (langCookie, langHeader) => {
  let supportedLangs = get('SUPPORTED_LANGUAGES');
  let lang = 'en';
  if (langCookie) {
    if (supportedLangs[langCookie.substr(0,2)]) {
      lang = langCookie;
    }
  } else if (langHeader) {
    let headerParts = langHeader.split(',');
    headerParts.some(function(part) {
      part = part.split(';')[0];
      part = part.split('-')[0];
      if (supportedLangs[part]) {
        lang = supportedLangs[part].code;
        return true;
      }
    });
  }

  return lang;
};

export default function app(state = initialState, action) {
  switch(action.type) {
    case 'SET_LANGUAGE':
      return Object.assign({}, state, {
        language: getLanguage(action.langCookie, action.langHeader)
      });

    case 'SET_ERROR':
      return Object.assign({}, state, {
        error: {
          code: action.code
        }
      });

    default:
      return state;
  }
}