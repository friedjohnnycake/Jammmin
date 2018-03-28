import React from 'react';
import './SearchBar.css';
import Enter from '../Enter/Enter';

class SearchBar extends React.Component {
   constructor(props){
       super(props);

    this.state={term:''}

       this.search = this.search.bind(this);
       this.handleTermChange = this.handleTermChange.bind(this);
       this.searchOnEnter = this.searchOnEnter.bind(this);
   }

    handleTermChange(event){
        this.setState({term: event.target.value})
    }

    search(){
        this.props.onSearch(this.state.term)
    }

    searchOnEnter(e) {
        if(e.key === 'Enter') {
            console.log("the key enter is presssed and search term state is", this.state.term);
            this.props.onSearch(this.state.term);
            e.preventDefault();
        };  
    }

    render() {
        return (
        <div className="SearchBar">
                <input type = "search" placeholder='Enter a Song, Album or Artist' onChange={this.handleTermChange} onKeyDown = {this.searchOnEnter} />
                <a onClick = {this.search}>SEARCH</a>
        </div>
        )
    }
}

export default SearchBar;