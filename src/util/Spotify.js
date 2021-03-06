
const redirectURI = window.location.href;
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
           return accessToken;
        }
        //Access Token variable is empty and not in the URL
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }

    },
    
    // returns a promise that will eventually resolve to a list of tracks
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {
            'Authorization': `Bearer ${accessToken}` 
        }
        }).then(response => {return response.json();
        }).then(jsonResponse => {console.log(jsonResponse);
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }));
                console.log(jsonResponse.tracks);
            }else{
                return []
            }
        });
    },


    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
          return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId="";
    
        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
          }).then(response => response.json()
          ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackUris})
            });
          });
        });
      }
    }




export default Spotify;