import { appInfo } from "../constants/appInfo";

const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';

export async function getDirections(from, to){
    const response = await fetch(`${BASE_URL}/walking/${from[0]},${from[1]};${to[0]}, ${to[1]}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${appInfo.MAPBOX_ACCESS_TOKEN}`);
    const json = await response.json();
    // console.log(JSON.stringify(json, null, 2));

    return json;
}