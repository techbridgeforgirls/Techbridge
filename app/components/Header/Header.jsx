import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Link } from 'react-router';

const messages = defineMessages({
  iLoveStem: {
    id: 'app.header.iLoveStem',
    description: 'Header message',
    defaultMessage: 'I {heart} STEM'
  }
});

export class Header extends React.Component {
  render() {
    let heart = <span className="glyphs">&#57344;</span>;
    return(
      <div id="tg-header">
        <Link to="/"><div id="tg-headerTitle"><FormattedMessage {...messages.iLoveStem} values={{ heart }}/></div></Link>
        <ul id="tg-headerNav">
          <li>
            <Link to="/" activeClassName="active"><span className="glyphs">&#57345;</span></Link>
          </li>
          <li>
            <Link to="/web" activeClassName="active"><span className="glyphs">&#57346;</span></Link>
          </li>
          <li>
            <Link to="/video" activeClassName="active"><span className="glyphs">&#57347;</span></Link>
          </li>
          <li>
            <Link to="/settings" activeClassName="active"><span className="glyphs">&#57348;</span></Link>
          </li>
        </ul>
      </div>
    );
  }
}
