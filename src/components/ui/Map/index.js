import ReactMapboxGl from 'react-mapbox-gl';

const Map = typeof window !== `undefined` ? ReactMapboxGl({ accessToken: process.env.GATSBY_MAPBOX_API_KEY }) : null;

export default Map;
