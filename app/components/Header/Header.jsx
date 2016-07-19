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
  constructor(props) {
    super(props);

    this.state = {
      showBackButton: false
    };
    this.historyCount = 0;
  }

  componentWillReceiveProps(nextProps) {
    let routeChanged = nextProps.location !== this.props.location;
    this.setState({ showBackButton: routeChanged });
    this.historyCount++;
  }

  handleBack(evt) {
    evt && evt.preventDefault();
    this.context && this.context.router && this.context.router.goBack();
    this.historyCount = this.historyCount - 2;
  }

  render() {
    let heart = <span className="glyphs">&#57344;</span>;
    let backBtn = (typeof window !== 'undefined' && window.history && window.history.length > 1) ? <a href="#" id="backBtn" onClick={this.handleBack.bind(this)}><span className="glyphs">&#57355;</span></a> : '';

    let headerItm = (!this.state.showBackButton || !backBtn || (this.historyCount < 1)) ? <Link to="/"><div id="tg-headerTitle"><FormattedMessage {...messages.iLoveStem} values={{ heart }}/></div></Link> : backBtn;
    return(
      <div id="tg-header">
        { headerItm }
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

Header.propTypes = {
  location: React.PropTypes.object
};

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};