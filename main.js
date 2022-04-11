let searchButton = document.querySelector('#search');

searchButton.addEventListener('click', function () {
    console.log('worki9ng')
    getLatLong();
});



let getLatLong = async () => {
    let apiInput = document.querySelector('#api-key');
    let addressInput = document.querySelector('#address');
    let mapURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(addressInput.value)}.json?types=address&access_token=${apiInput.value}`;
    let httpRes = await fetch(mapURL);
    let data = await httpRes.json();
    return data.features[0].center;
}

let getSatInfo = async () => {
    let latLonArr = await getLatLong();
    let satInput = document.querySelector('norad')
    let satURL = `https://satellites.fly.dev/passes/${satInput.value}?lat=${latLonArr[1]}&lon=${latLonArr[0]}&limit=1&days=15&visible_only=true`;
    let httpRes = await fetch(satURL);
    let data = await httpRes.json();
    console.log('rise')
    console.log(data[0].rise.utc_datetime);
    console.log('culmination');
    console.log(data[0].culmination.utc_datetime);
    console.log('set')
    console.log(data[0].set.utc_datetime);

}