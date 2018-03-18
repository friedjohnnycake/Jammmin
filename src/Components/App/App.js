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
    playListTracks: [
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
  }
  
  addTrack(track) {
   let playlistTrack = this.state.playlistTracks;
    playlistTrack.push(track)
    this.setState({playlistTracks: playlistTrack})
      }
    }
  

  render() {
    return (
      <div>
      <h1>Ja<span class="highlight">mmm</span>ing</h1>
      <div class="App">
        {/* <SearchBar/> */}
        <div class="App-playlist">
          <SearchResults searchResults = {this.state.searchResults}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
    );
  }

export default App;
