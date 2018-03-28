import React from 'react';

class Enter extends React.Component {
    constructor(props){
        super(props);
 
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
 

    handleKeyPress(e) {
        if(e.key === 'Enter') {
            console.log("You pressed Enter");
        };
        e.preventDefault();
    }


    render () {
        return false;
    }
}

export default Enter;
