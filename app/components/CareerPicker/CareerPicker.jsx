import React from 'react';
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

    this.state = {
      interests: this.props.params.interests.split(','),
      careers: []
    };
  }
  componentDidMount() {
    // Only fetch the career data after mounting. This code won't run on the server (only on the client)
    var that = this;

    // TOFIX: Replace with actual API call, with real data
    let getData = new Promise(function (resolve) {
      setTimeout(function () {
        resolve(['Biologist', 'Molecular Biologist', 'Biochemical Engineer', 'Biomechanical Engineer']);
      }, 100);
    });

    getData.then(function (careers) {
      that.setState({ careers: careers });
    });
  }
  render() {

    // Construct the list of careers
    var careerElements = [];
    this.state.careers.forEach(function (career, index) {
        careerElements.push(
          <Link to={'/career'} key={index}>
            <div className="career-circle" style={careerPositions[index]}>
              <span className="career-circle-text">{career}</span>
            </div>
          </Link>
        );
    });

    return(
      <div id="tg-careerpicker">
        <div className="interest-list">
          <InterestList interestList={this.state.interests}/>
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
  params: React.PropTypes.object
};

export { CareerPicker };
