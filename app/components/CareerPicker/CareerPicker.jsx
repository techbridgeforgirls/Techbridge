import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Link } from 'react-router';
import { InterestList } from '../InterestList/InterestList';

const messages = defineMessages({
  iCouldBeA: {
    id: 'app.careerPicker.iCouldBeA',
    description: 'Psychologically-probing metaphysical suggestion',
    defaultMessage: 'I could be a...'
  }
});

const careerPositions = [
  { left: 300, top: 150 },
  { left: 350, top: 400 },
  { left: 530, top: 210 },
  { left: 700, top: 380 }
];

class CareerPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var location = this.props.location;

    var careers = this.props.careers.data || {};
    var careerList = careers.list || [];

    var interestsList = this.props.interests.selected;

    // Construct the list of careers
    var careerElements = [];
    careerList.forEach(function (career, index) {
        careerElements.push(
          <Link to={{ pathname: '/career', query: Object.assign({ }, location.query, { career: career.id }) }} key={career.id}>
            <div className="career-circle" style={careerPositions[index]}>
              <span className="career-circle-text">{career.name}</span>
            </div>
          </Link>
        );
    });

    return(
      <div id="tg-careerpicker">
        <div className="interest-list">
          <InterestList interestList={interestsList}/>
        </div>
        <div className="icouldbea">
          <FormattedMessage {...messages.iCouldBeA}/>
        </div>
        <div className="career-list">{careerElements}</div>
      </div>
    );
  }
}

CareerPicker.propTypes = {
  params: React.PropTypes.object,
  careers: React.PropTypes.object,
  interests: React.PropTypes.object,
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

export { CareerPicker };

export default connect((state) => ({
  interests: state.interests,
  careers: state.careers
}))(CareerPicker);
