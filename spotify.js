const SpotifyAuth = {
    clientId: '0dc72c6d704a4ed6a04eee09782dc1eb', // Updated client ID
    redirectUri: 'https://spotify-analystics.vercel.app/top-insights.html', // Redirect to top-insights.html
    scope: 'user-top-read user-read-currently-playing user-read-playback-state user-modify-playback-state',
    accessToken: '',

    login() {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scope)}`;
        window.location.href = authUrl;
    },

    logout() {
        this.accessToken = '';
        localStorage.removeItem('spotify_access_token');
        window.location.reload();
    },

    checkForAccessToken() {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        if (params.has('access_token')) {
            this.accessToken = params.get('access_token');
            localStorage.setItem('spotify_access_token', this.accessToken);
            window.location.hash = '';
        } else if (localStorage.getItem('spotify_access_token')) {
            this.accessToken = localStorage.getItem('spotify_access_token');
        }

        return !!this.accessToken;
    },

    getAccessToken() {
        return this.accessToken;
    }
};
