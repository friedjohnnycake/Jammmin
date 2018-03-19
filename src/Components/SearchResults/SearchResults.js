import React from 'react';
import Tracklist from "../TrackList/TrackList";
import './SearchResults.css'

class SearchResults extends React.Component{ 
    render() {
        return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={this.props.searchResults} onAdd = {this.props.onAdd} onRemove = {this.props.onRemove}/>
        </div>
        )
    }
}

export default SearchResults;