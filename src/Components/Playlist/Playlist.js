import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component {
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.saveOnEnter = this.saveOnEnter.bind(this);
    }
    
    handleNameChange(event) {
        this.props.nameChange(event.target.value);
    }

    saveOnEnter(e) {
        if(e.key === 'Enter') {
            console.log("the key enter is presssed and the you're saving the playlist");
            this.props.onSave();
            e.preventDefault();
        };  
    }


    render(){
        return(
        <div className="Playlist">
            <input value={this.props.playlistName} placeholder={'Enter Playlist Name'} onChange = {this.handleNameChange} onKeyDown = {this.saveOnEnter}/>
            <TrackList tracks={this.props.playlistTracks} onAdd ={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove}/>
            <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a> 
        </div>
        )
    }
}

export default Playlist;