import React from 'react';
import './App.css';
import SearchBar      from '../SearchBar/SearchBar';
import SearchResults  from '../SearchResults/SearchResults';
import PlayList       from '../PlayList/PlayList';
import Spotify        from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playListName: 'New Playlist',
      playListTracks: []
    }
    // Bind values to methods
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }
    // Adds tracks to the playlist state, triggered by the plus sign
    addTrack(track) {
      let tracks = this.state.playListTracks;
      tracks.push(track);
      this.setState({
        playListTracks: tracks
      });
    }
    // Remove tracks
    removeTrack(track) {
      let tracks = this.state.playListTracks;
      tracks = tracks.filter(current => current.id !== track.id);
      this.setState({
        playListTracks: tracks
      });
    }
    updatePlayListName(name) {
      this.setState({
        playListName: name
      });
    }
    savePlayList() {
      let trackURIs = this.state.playListTracks.map(track => track.uri);
      Spotify.savePlayList(this.state.playListName, trackURIs).then(() => {
        this.setState({
          playListName: 'New Playlist',
          playListTracks: []
        });
      });
    }
    search(term) {
      Spotify.search(term).then(searchResults => {
        this.setState({
          searchResults: searchResults
        })
      });
    }
    render() {
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              {/* Pass the state's search results and addTrack method to the SearchResults component */}
              <SearchResults searchResults={this.state.searchResults}
                             onAdd={this.addTrack} />
              {/* Pass the playlist name and tracks to the PlayList component */}
              <PlayList playListName={this.state.playListName}
                        playListTracks={this.state.playListTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlayListName}
                        onSave={this.savePlayList} />
            </div>
          </div>
        </div>
      );
   }
}

export default App;
