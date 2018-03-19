import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {searchResults: [
      {name: " ", 
      artist: " ", 
      album: " "},
      {name: " ", 
      artist: " ", 
      album: " "},
      {name: " ", 
      artist: " ", 
      album: " "}
    ],
    playlistName: 'The Best One',
    playlistTracks: [
      {name: " ", 
      artist: " ", 
      album: " "},
      {name: " ", 
      artist: " ", 
      album: " "},
      {name: " ", 
      artist: " ", 
      album: " "}
    ]}

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  
  addTrack(track) {
   let tracks = this.state.playlistTracks;
   if(!tracks.find(tracks => tracks.id === track.id)) {
    let newList = tracks.concat(track);
    this.setState({playlistTracks: newList})
      }
    }
  
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    if(tracks.find(tracks => tracks.id === track.id)) {
      let filteredTracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
      this.setState({playlistTracks: filteredTracks})
    }
  }
  

  render() {
    return (
      <div>
      <h1>Ja<span class="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <SearchBar/> */}
        <div class="App-playlist">
          <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack} onRemove = {this.removeTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
    )
  }
}
 

export default App;
