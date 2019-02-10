import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }
  renderAction() {
    // Render track action depending on isRemoval attribute
    // Return span for eliminating href anchor warnings
    return (this.props.isRemoval)
    ? <span id={this.props.track.id} className="Track-action" onClick={this.removeTrack}>&minus;</span>
    : <span id={this.props.track.id} className="Track-action" onClick={this.addTrack}>+</span>;
  }
  // Fetch added or removed tracks to or from the tracklist
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          {/* Render the track name, artist and album */}
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {/* Render track action */}
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
