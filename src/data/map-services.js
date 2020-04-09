const accessToken =
    process.env.GATSBY_MAPBOX_KEY ||
    'pk.eyJ1IjoiZWNob2doaSIsImEiOiJjaXRodDE4Y2EwMnVuMnlvM2pkOGJ2ajdwIn0.6GIq33H8rzBpQc_Sw6AHKg';

export const mapServices = [
    {
        name: 'OpenStreetMap',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    {
        name: 'MapBox',
        attribution: '&copy; <a href="http://osm.org/copyright">MapBox</a> contributors',
        url: `https://api.mapbox.com/styles/v1/echoghi/ck8qrlemn0hmo1io3zzr0wos1.html?fresh=true&title=view&access_token=${accessToken}`
    }
];
