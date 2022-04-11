let searchButton = document.querySelector('#search');

searchButton.addEventListener('click', function () {
    console.log('worki9ng')
    getLatLong();
});



let getLatLong = async () => {
    let apiInput = document.querySelector('#api-key');
    let addressInput = document.querySelector('#address');
    let mapURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(addressInput.value)}.json?types=address&access_token=${apiInput.value}`;
    console.log(mapURL)
    let httpRes = await fetch(mapURL);
    let data = await httpRes.json();
    console.log(data.features[0].center);
}