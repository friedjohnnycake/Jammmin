
const redirectURI = 'http://localhost:3000/';
const clientID = '3f89fc5e12694f2fb340fcfd99361d6a';


let accessToken = ''
let expiresIn = ''

const Spotify = {
    getAccessToken(){
        // checks to see if the access token is already there
        if(accessToken) {
            return accessToken;
        }

        // if token is not already set, checks the user URL for the access token
        let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
           accessToken = accessTokenMatch[1];
           expiresIn = expiresInMatch[1];
           window.setTimeout=(() => accessToken = '', expiresIn * 1000);
           window.history.pushState('Access Token', null, '/');
        }
        //Access Token variable is empty and not in the URL
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }

    }
    
    //returns a promise that will eventually resolve to a list of tracks
    search(searchTerm) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        {headers: {
            'Authorization': 'Bearer ' + accessToken
        }
        }).then(response => {return response.json()
        }).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artist,
                    album: track.album,
                    uri: track.uri,
                }));
            }else{
                return []
            }
        });
    }
};




export default Spotify;