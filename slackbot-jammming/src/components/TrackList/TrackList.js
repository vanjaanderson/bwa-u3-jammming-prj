import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return(
      <div className="TrackList">
        {/* Render each track in the tracks prop with .map() */}
        {this.props.tracks.map(track => {
          /* Pass added track to the track component */
          return <Track key={track.id}
                        track={track}
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval} />
          })}
      </div>
    );
  }
}

export default TrackList;
