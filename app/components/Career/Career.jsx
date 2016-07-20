import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';
import { InterestList } from '../InterestList/InterestList';
import { Link } from 'react-router';
import { Lightbox } from '../Lightbox/Lightbox';

const messages = defineMessages({
  helpPeople: {
    id: 'app.career.helpPeople',
    description: 'Header description of how professionals help',
    defaultMessage: '{title} can help people:'
  },
  meetStar: {
    id: 'app.career.meetStar',
    description: 'Header for Stars section',
    defaultMessage: 'Meet a STEM star:'
  },
  classesTitle: {
    id: 'app.career.classesTitle',
    description: 'Header for classes section',
    defaultMessage: 'Classes To Take'
  },
  videosTitle: {
    id: 'app.career.videosTitle',
    description: 'Header for videos section',
    defaultMessage: 'Videos To Watch'
  },
  collegesTitle: {
    id: 'app.career.collegesTitle',
    description: 'Header for colleges section',
    defaultMessage: 'Colleges To Visit'
  }
});

const CLASS_FIELDS = ['classestotake1', 'classestotake2', 'classestotake3'];
const COLLEGE_FIELDS = ['collegestovisit1', 'collegestovisit2', 'collegestovisit3'];
const SKILL_FIELDS = ['canhelppeople1', 'canhelppeople2', 'canhelppeople3'];

export class Career extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showVideo: false
    };
  }

  getList(fields) {
    var careerData = this.props.careerData;
    var description = careerData && careerData.data && careerData.data.description[0];
    var list = [];
    fields.forEach(field => {
      if (description && description[field]) {
        list.push(description[field]);
      }
    });
    return list;
  }

  getCareer() {
    var careerData = this.props.careerData;
    return careerData && careerData.data && careerData.data.career;
  }

  getVideos() {
    var careerData = this.props.careerData;
    var description = careerData && careerData.data && careerData.data.description[0];
    if (description) {
      return [{
        title: description.videotitle,
        url: description.video
      }];
    }
    return [];
  }

  getRoleModels() {
    var careerData = this.props.careerData;
    var roleModels = careerData && careerData.data && careerData.data.rolemodels;
    var list = [];
    if (roleModels) {
      roleModels.forEach((roleModel, index) => {
        list.push({
          id: roleModel.id,
          img: roleModel.image + '?cachebuster=' + index,
          name: roleModel.firstname + ' ' + roleModel.lastname,
          title: roleModel.jobtitle
        });
      });
    }
    return list;
  }

  getClassList() {
    let classes = this.getList(CLASS_FIELDS).map(function(curClass, index) {
      return (<li key={'class-'+index}>{curClass}</li>);
    });
    return (<div>
      <h4 className="listTitle"><FormattedMessage {...messages.classesTitle}/></h4>
      <ul className="classList">{classes}</ul>
    </div>);
  }

  getVideoList() {
    let self = this;
    let videos = this.getVideos().map(function(curVideo, index) {
      return (<li key={'video-'+index}><a href="#" onClick={self.showLightbox.bind(self, curVideo.title, curVideo.url)}>{curVideo.title}</a></li>);
    });
    return (<div>
      <h4 className="listTitle"><FormattedMessage {...messages.videosTitle}/></h4>
      <ul className="videoList">{videos}</ul>
    </div>);
  }

  getCollegeList() {
    let colleges = this.getList(COLLEGE_FIELDS).map(function(curCollege, index) {
      return (<li key={'college-'+index}>{curCollege}</li>);
    });
    return (<div>
      <h4 className="listTitle"><FormattedMessage {...messages.collegesTitle}/></h4>
      <ul className="collegeList">{colleges}</ul>
    </div>);
  }

  showLightbox(curVideoTitle, curVideoUrl) {
    // TEMP until fix data
    if (curVideoUrl.indexOf('youtube') !== -1 && curVideoUrl.indexOf('embed') === -1) {
      curVideoUrl = curVideoUrl.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, 'www.youtube.com/embed/$1');
    }
    this.setState({ showVideo: true, curVideoTitle: curVideoTitle, curVideoUrl: curVideoUrl });
  }

  hideLightbox() {
    this.setState({ showVideo: false });
  }

  render() {
    var location = this.props.location;
    var interestsList = this.props.interests.selected;

    let skills = this.getList(SKILL_FIELDS).map(function(skill, index) {
      return (<li key={'skill-'+index}>{skill}</li>);
    });

    let stars = this.getRoleModels().map(function(star, index) {
      let url = '/stars/' + star.id;
      return (<li key={'star-' + index}>
        <Link to={{ pathname: url, query: location.query }}>
          <img src={star.img}/>
          <div className="tg-starDetail">
            <div className="glyphs">&#57349;</div>
            <div>{star.name}</div>
            <div>{star.title}</div>
          </div>
        </Link>
      </li>);
    });

    let lists = [];
    lists.push(<li className="list" key="list-classes">{this.getClassList()}</li>);
    lists.push(<li className="list" key="list-videos">{this.getVideoList()}</li>);
    lists.push(<li className="list" key="list-colleges">{this.getCollegeList()}</li>);

    let lightbox = '';
    if (this.state.showVideo) {
      lightbox = <Lightbox src={this.state.curVideoUrl} title={this.state.curVideoTitle} onClose={this.hideLightbox.bind(this)}></Lightbox>;
    }

    return(
      <div id="tg-career">
        <div>
          <InterestList interestList={interestsList} componentStyle={{ display: 'inline-block' }}/>
          <div className="tg-careerHeader">/ {this.getCareer()}</div>
        </div>
        <div className="tg-careerBody">
          <div className="tg-careerDetail">
            <h3><FormattedMessage {...messages.helpPeople} values={{ title: this.getCareer() }}/></h3>
            <ul>{skills}</ul>
          </div>
          <div className="tg-starList">
            <h3><FormattedMessage {...messages.meetStar}/></h3>
            <ul>{stars}</ul>
          </div>
        </div>
        <ul className="tg-careerLists">{lists}</ul>
        {lightbox}
      </div>
    );
  }
}

Career.propTypes = {
  interests: React.PropTypes.object,
  careerData: React.PropTypes.object,
  location: React.PropTypes.object
};

export default connect((state) => ({
  interests: state.interests,
  careerData: state.careerData
}))(Career);
