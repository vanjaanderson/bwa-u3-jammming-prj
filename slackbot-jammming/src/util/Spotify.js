// Spotify API
const clientID =      '879e105c559840308884383d17aea72b';
//const redirectURI =   'http://localhost:3000/';
const redirectURI =   'http://solursparken.com/jammming';
// Spotify URL
const spotifyURL = 'https://api.spotify.com/v1/';
const spotifyAccount = 'https://accounts.spotify.com/';
// Declare variables to use further on
let accessToken = '';
let expiresIn = '';
let userID = '';
let playListID = '';

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    } else {
        // Filter out the access token and expiration time from the browsers url
        const fetchAccesToken = window.location.href.match(/access_token=([^&]*)/);
        const fetchExpireTime = window.location.href.match(/expires_in=([^&]*)/);
        if (fetchAccesToken && fetchExpireTime) {
        accessToken = fetchAccesToken[1];
        expiresIn = fetchExpireTime[1];
        // Set the access token to expire at the value for expiration time
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        // Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
        window.history.pushState('Access Token', null, '/');
        //return accessToken;
      } else { //
        window.location = `${spotifyAccount}authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    }
  },
  search(term) {
    if (!accessToken) { Spotify.getAccessToken(); }
    const searchURL = `${spotifyURL}search?type=track&q=${term}`;
    // Return a GET request
    return fetch(searchURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      } // Convert response to JSON
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('Request failed');
      }
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) { return []; }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    })
  },
  savePlayList(playListName, trackURIs) {
    if (!playListName || !trackURIs) {
      return;
    } else {
      // GET current userID
       return fetch(`${spotifyURL}me`, {
         headers: {
           Authorization: `Bearer ${accessToken}`
         }
     }).then(response => {
       if (response.ok) {
         return response.json();
       } else {console.log('Request failed')}
     }).then(jsonResponse => {
       if (!accessToken) { Spotify.getAccessToken(); }
         userID = jsonResponse.id;
         return fetch(`${spotifyURL}users/${userID}/playlists`, {
           headers: 
             {Authorization: `Bearer ${accessToken}`},
             method: 'POST',
             body: JSON.stringify({
               name: playListName
             })
        })
     }).then(response => {
       if (response.ok) {
         return response.json();
       } else {console.log('Request failed')}
     }).then(jsonResponse => {
       if (!accessToken) { Spotify.getAccessToken(); }
        playListID = jsonResponse.id;
        return fetch(`${spotifyURL}users/${userID}/playlists/${playListID}/tracks`, {
          headers: 
            {Authorization: `Bearer ${accessToken}`},
            method: 'POST',
            body: JSON.stringify({
              uris: trackURIs
            })
        })
     });
    }
  }
};

export default Spotify;
