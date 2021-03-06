import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
    searchResults: [],
    playlistName: "New Playlist",
    playlistTracks: []
  };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Adds a track to the playlist
  addTrack(track) {
   let tracks = this.state.playlistTracks;
   if(!tracks.find(tracks => tracks.id === track.id)) {
    let newList = tracks.concat(track);
    this.setState({playlistTracks: newList})
      };
    }

  // Removes a track from the playlist
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    if(tracks.find(tracks => tracks.id === track.id)) {
      let filteredTracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
      this.setState({playlistTracks: filteredTracks})
    };
  }

  
  // Changes the name of the Playlist
  updatePlaylistName(name) {
   this.setState({playlistName: name});
  }

// generates a list of uris from the playlistTracks property
savePlaylist(){
  const trackUris = this.state.playlistTracks.map(track => track.uri);
  Spotify.savePlaylist(this.state.playlistName, trackUris);
  this.setState({
    playlistTracks: [],
  });
  this.setState({playlistName: 'New Playlist'});
  console.log(this.state.playlistName);
}


search(term) {
  console.log(term);
  Spotify.search(term).then(spotifyResults => this.setState({searchResults: spotifyResults}));
  console.log(`You are searching Spotify for ${term}`);
}
  
  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults = {this.state.searchResults} isRemoval={false} onAdd = {this.addTrack}/>
          <Playlist  isRemoval={true} onSave = {this.savePlaylist} playlistName={this.state.playlistName} nameChange = {this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
        </div>
      </div>
    </div>
    )
  }
}

 

export default App;
