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
  { left: 550, top: 210 },
  { left: 750, top: 380 }
];

var CAREER_MAP = {
  '3D printing and modeling technologies': 'printer',
  'Aerospace Engineer': 'airplane',
  'Biology': 'leaf',
  'Biomechanical Engineer': 'leaf',
  'Industrial Operations Engineering, Systems engineering': 'wrench',
  'Chemical Engineer': 'lab',
  'Computer Engineer/Data Scientist': 'keyboard',
  'CSI': 'lab',
  'Developer/Artist': 'keyboard',
  'DJ': 'headphones',
  'Sound Engineer': 'headphones',
  'Electrical Engineer': 'power',
  'Enviromental Science': 'leaf',
  'Food Flavorist': 'spoon-knife',
  'Food Nutrition Scientist': 'spoon-knife',
  'Food Researcher / Engineer': 'spoon-knife',
  'Graphic Design': 'pen',
  'Landscape Architect': 'earth',
  'Mechanical Engineer': 'wrench',
  'Physicist': 'rocket',
  'Rocket Scientist': 'wrench',
  'Safety Engineer': 'lifebuoy',
  'Sports Medicine': 'lab',
  'Structural Engineer': 'wrench',
  'Textile Engineering': 'user-tie',
  'User Interface Designer': 'keyboard',
  'Veterinarian': 'leaf',
  'Zoo Keeper': 'leaf'
};

function getIcon(career) {
  return career.icon || CAREER_MAP[career.name] || 'trophy';
}

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
              <span className="career-circle-text"><span className="icomoon career-circle-icon">{getIcon(career)}</span><br/>{career.name}</span>
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
