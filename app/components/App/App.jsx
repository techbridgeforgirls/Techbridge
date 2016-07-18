import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
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

export class App extends React.Component {
  render() {
    let lang = (this.props.app && this.props.app.language) || 'en';
    let localizedStrings = stringSets[lang.substr(0,2)];
    return(
      <IntlProvider locale="en" messages={localizedStrings}>
        <div id="tg-appContainer">
          <Header/>
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  app: React.PropTypes.object,
  children: React.PropTypes.object
};

export default connect((state) => ({
  app: state.app
}))(App);