import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { InterestList } from '../InterestList/InterestList';
import { Link } from 'react-router';

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

export class Career extends React.Component {
  getClassList() {
    let classes = this.props.classes.map(function(curClass, index) {
      return (<li key={'class-'+index}>{curClass}</li>);
    });
    return (<div>
      <h4 className="listTitle"><FormattedMessage {...messages.classesTitle}/></h4>
      <ul className="classList">{classes}</ul>
    </div>);
  }

  getVideoList() {
    let videos = this.props.videos.map(function(curVideo, index) {
      return (<li key={'video-'+index}>{curVideo}</li>);
    });
    return (<div>
      <h4 className="listTitle"><FormattedMessage {...messages.videosTitle}/></h4>
      <ul className="videoList">{videos}</ul>
    </div>);
  }

  getCollegeList() {
    let colleges = this.props.colleges.map(function(curCollege, index) {
      return (<li key={'college-'+index}>{curCollege}</li>);
    });
    return (<div>
      <h4 className="listTitle"><FormattedMessage {...messages.collegesTitle}/></h4>
      <ul className="collegeList">{colleges}</ul>
    </div>);
  }

  render() {
    let skills = this.props.skills.map(function(skill, index) {
      return (<li key={'skill-'+index}>{skill}</li>);
    });

    let stars = this.props.stars.map(function(star, index) {
      let url = '/stars/'+star.id;
      return (<li key={'star-'+index}>
        <Link to={url}>
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
    if (this.props.classes && this.props.classes.length) {
      lists.push(<li className="list" key="list-classes">{this.getClassList()}</li>);
    }
    if (this.props.videos && this.props.videos.length) {
      lists.push(<li className="list" key="list-videos">{this.getVideoList()}</li>);
    }
    if (this.props.colleges && this.props.colleges.length) {
      lists.push(<li className="list" key="list-colleges">{this.getCollegeList()}</li>);
    }

    return(
      <div id="tg-career">
        <div>
          <InterestList componentStyle={{ display: 'inline-block' }}/>
          <div className="tg-careerHeader">/ {this.props.careerTitle}</div>
        </div>
        <div className="tg-careerBody">
          <div className="tg-careerDetail">
            <h3><FormattedMessage {...messages.helpPeople} values={{ title: this.props.careerTitle }}/></h3>
            <ul>{skills}</ul>
          </div>
          <div className="tg-starList">
            <h3><FormattedMessage {...messages.meetStar}/></h3>
            <ul>{stars}</ul>
          </div>
        </div>
        <ul className="tg-careerLists">{lists}</ul>
      </div>
    );
  }
}

Career.propTypes = {
  classes: React.PropTypes.array,
  videos: React.PropTypes.array,
  colleges: React.PropTypes.array,
  careerTitle: React.PropTypes.string,
  skills: React.PropTypes.array,
  stars: React.PropTypes.array
};

Career.defaultProps = {
  careerTitle: 'Food Scientist',
  classes: ['Chemistry', 'Biology', 'Cooking'],
  videos: ['Science 360', 'Leaf Snap', 'Sugar Shake'],
  colleges: ['Purdue', 'East Tennessee', 'UC Berkley'],
  skills: ['by making foods healthy', 'by inventing new types of food and recipes'],
  stars: [{
    name: 'Katie',
    title: 'Food Scientist',
    img: 'http://medicalandhealthcare.com/wp-content/uploads/2015/10/Agricultural-and-Food-Scientist.jpg',
    id: 1
  },
  {
    name: 'Sarah',
    title: 'College Student',
    img: 'http://theglasshammer.com/wp-content/uploads/2015/03/girl-education.jpg',
    id: 2
  }]
};
