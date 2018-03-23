import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component {
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(event) {
        this.props.nameChange(event.target.value);
    }


    render(){
        return(
        <div className="Playlist">
            <input defaultValue={'New Playlist'} placeholder={'Enter Playlist Name'} onChange = {this.handleNameChange}/>
            <TrackList tracks={this.props.playlistTracks} onAdd ={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove}/>
            <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a> 
        </div>
        )
    }
}

export default Playlist;