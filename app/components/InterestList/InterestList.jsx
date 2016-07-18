import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  iHeartList: {
    id: 'app.interestList.iHeartList',
    description: 'List of user liked interests',
    defaultMessage: 'I {heart} {interest1} {interest2} {interest3}'
  }
});

export class InterestList extends React.Component {
  render() {
    let heart = <span className="glyphs">&#57344;</span>;
    let interest1 = '';
    let interest2 = '';
    let interest3 = '';

    if (this.props.interestList) {
      if (this.props.interestList.length > 0) {
        interest1 = <span className="interestItem">{this.props.interestList[0]}</span>;
      }
      if (this.props.interestList.length > 1) {
        interest2 = <span className="interestItem">{this.props.interestList[1]}</span>;
      }
      if (this.props.interestList.length > 2) {
        interest3 = <span className="interestItem">{this.props.interestList[2]}</span>;
      }
    }

    let strVals = {
      heart: heart,
      interest1: interest1,
      interest2: interest2,
      interest3: interest3
    };

    return(
      <div id="tg-interestList" style={this.props.componentStyle}>
        <FormattedMessage {...messages.iHeartList} values={strVals}/>
      </div>
    );
  }
}

InterestList.propTypes = {
  componentStyle: React.PropTypes.object,
  interestList: React.PropTypes.array
};

InterestList.defaultProps = {
  componentStyle: {},
  interestList: ['Food', 'Baking', 'Experiment']
};
