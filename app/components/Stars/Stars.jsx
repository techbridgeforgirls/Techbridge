import React from 'react';
import { InterestList } from '../InterestList/InterestList';
import { Lightbox } from '../Lightbox/Lightbox';

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starId: this.props.params.starId,
      star: {}
    };
  }

  componentDidMount() {
    var that = this;
    // TOFIX: See if it is local RAM, else do the API call.
    let getData = new Promise(function (resolve) {
      setTimeout(function() {
        resolve({
          id: that.props.params.starId,
          name: 'Katie',
          heading: 'Hi there! My name is Katie, I love working as a food scientist at Kraft. I invent new smoothies!',
          image: 'http://placehold.it/400x400&text=Profile%20Image',
          video: 'https://www.youtube.com/embed/d6VXDw_oA0Y',
          videoTitle: 'Sample Video',
          designation: 'Food Scientist, Kraft'
        });
      }, 200);
    });

    getData.then(function (starData) {
      that.setState({ star: starData });
    });
  }

  showLightbox() {
    this.setState({ showVideo: true });
  }

  hideLightbox() {
    this.setState({ showVideo: false });
  }

  render() {
    var lightbox;
    if (this.state.showVideo) {
      lightbox = <Lightbox src={this.state.star.video} title={this.state.star.videoTitle} onClose={this.hideLightbox.bind(this)}></Lightbox>;
    }
    return(
      <div id="tg-stars">
        <InterestList />
        <div className="profile">
          <img src={this.state.star.image} alt={this.state.star.name} className="profile-image"/>
          {this.state.star.name}, <br />
          {this.state.star.designation}
        </div>
        <h1 className="heading">{this.state.star.heading}</h1>
        <div className="video" onClick={this.showLightbox.bind(this)}>
          <iframe type="text/html" src={this.state.star.video} frameBorder="0"/>
          {this.state.star.videoTitle}
        </div>
        {lightbox}
      </div>
    );
  }
}

Stars.propTypes = {
  params: React.PropTypes.object
};

export { Stars };