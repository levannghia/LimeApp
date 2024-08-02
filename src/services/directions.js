export async function getDirections(){
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/-122.083922%2C37.4220936%3B-122.08119%2C37.392199?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoibWVvZW0yNzEyIiwiYSI6ImNsdjYxaXZ4NzA3czgya3FmbW1mdThoOGMifQ.s2oy36z3YE0XuwjxCyVG2A`);
    const json = await response.json();
    console.log(json);
}