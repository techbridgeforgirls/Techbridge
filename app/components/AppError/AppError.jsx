import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData, FormattedMessage, defineMessages } from 'react-intl';
import { get } from '../../utils/config.js';
import { Header } from '../Header/Header';

/* eslint import/no-commonjs: 0*/
// Cannot dynamically require because of browserify
let localDataSets = {
  'en': require('react-intl/locale-data/en')
};
let supportedLangs = Object.keys(get('SUPPORTED_LANGUAGES') || {});
Object.keys(localDataSets).forEach(function(key) {
  if (supportedLangs.indexOf(key) !== -1) {
    addLocaleData(localDataSets[key]);
  }
});
let stringSets = {
  'en': require('../../i18n/en.json')
};

const messages = defineMessages({
  unavailableMessage: {
    id: 'app.appError.unavailable',
    description: 'Temporarily unavailable message',
    defaultMessage: 'This page is unavailable.'
  },
  unavailableMessage2: {
    id: 'app.appError.unavailable2',
    description: 'Temporarily unavailable message',
    defaultMessage: 'Please try again later.'
  }
});

export class AppError extends React.Component {
  render() {
    let lang = (this.props.app && this.props.app.language) || 'en';
    let localizedStrings = stringSets[lang.substr(0,2)];
    return(
      <IntlProvider locale="en" messages={localizedStrings}>
        <div id="tg-appContainer">
          <Header/>
          <div id="pl-appcontainer-error-page">
            <div><FormattedMessage {...messages.unavailableMessage}/></div>
            <div><FormattedMessage {...messages.unavailableMessage2}/></div>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

AppError.propTypes = {
  app: React.PropTypes.object
};

export default connect((state) => ({
  app: state.app
}))(AppError);