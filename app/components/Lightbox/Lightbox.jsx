import React from 'react';

export class Lightbox extends React.Component {
    videoSize() {
        return window ? Math.min(window.innerWidth, window.innerHeight, 600) : 600;
    }
    render() {
        return (
            <div id="lightbox">
                <div className="lightbox-content" width={this.videoSize()}>
                    <div className="lightbox-close" onClick={this.props.onClose}>x</div>
                    <iframe type="text/html" src={this.props.src} width={this.videoSize()} height={this.videoSize()} frameBorder="0"/>
                    <div className="lightbox-title">{this.props.title}</div>
                </div>
            </div>
        );
    }
}

Lightbox.propTypes = {
    src: React.PropTypes.string,
    title: React.PropTypes.string,
    onClose: React.PropTypes.func
};