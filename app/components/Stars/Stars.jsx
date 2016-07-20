import React from 'react';
import { InterestList } from '../InterestList/InterestList';
import { Lightbox } from '../Lightbox/Lightbox';
import { connect } from 'react-redux';

export class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starId: this.props.params.starId,
      star: {}
    };
  }

  showLightbox() {
    this.setState({ showVideo: true });
  }

  hideLightbox() {
    this.setState({ showVideo: false });
  }
  getRoleModel() {
    var careerData = this.props.careerData;
    var roleModels = careerData && careerData.data && careerData.data.rolemodels;
    var model = {};
    if (roleModels) {
      roleModels.some((rolemodel) => {
        if (rolemodel.id === this.props.params.starId)
        {
          model = Object.assign(rolemodel, {
            video: rolemodel.video.replace('/watch?v=', '/embed/')
          });
          return true;
        }
      });
    }
    return model;
  }

  render() {
    var rolemodel = this.getRoleModel();

    var interestsList = this.props.interests.selected;
    var lightbox;
    if (this.state.showVideo) {
      lightbox = <Lightbox src={rolemodel.video} title={rolemodel.videotitle} onClose={this.hideLightbox.bind(this)}></Lightbox>;
    }
    return(
      <div id="tg-stars">
        <div className="interest-list">
          <InterestList interestList={interestsList}/>
        </div>
        <div id="tg-stars-container">
          <div className="profile">
            <img src={rolemodel.image} className="profile-image"/>
            {rolemodel.firstname} {rolemodel.lastname}, <br />
            {rolemodel.jobtitle}
          </div>
          <h1 className="heading">{rolemodel.blurb}</h1>
          <div className="video" onClick={this.showLightbox.bind(this)}>
            <iframe type="text/html" src={rolemodel.video} frameBorder="0"/>
            {rolemodel.videotitle}
          </div>
          {lightbox}
        </div>
      </div>
    );
  }
}

Stars.propTypes = {
  interests: React.PropTypes.object,
  careerData: React.PropTypes.object,
  params: React.PropTypes.object,
  location: React.PropTypes.object
};

export default connect((state) => ({
  interests: state.interests,
  careerData: state.careerData
}))(Stars);
