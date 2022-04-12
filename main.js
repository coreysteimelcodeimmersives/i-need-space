let searchButton = document.querySelector('#search');
let riseDateTime = document.querySelector('#riseDateTime');
let culminationDateTime = document.querySelector('#culminationDateTime');
let setDateTime = document.querySelector('#setDateTime');

searchButton.addEventListener('click', function () {
    riseDateTime.innerText = '';
    culminationDateTime.innerText = '';
    setDateTime.innerText = '';
    getSatInfo();
});



let getLatLong = async () => {
    let apiInputLaptop = document.querySelector('#api-key-laptop');
    let apiInputMobile = document.querySelector('#api-key-mobile');
    let addressInputLaptop = document.querySelector('#address-laptop');
    let addressInputMobile = document.querySelector('#address-mobile');
    let mapURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(addressInputLaptop.value+addressInputMobile.value)}.json?types=address&access_token=${apiInputLaptop.value+apiInputMobile.value}`;
    console.log('apiValue');
    console.log(apiInputLaptop.value);
    console.log(apiInputMobile.value);
    console.log('address');
    console.log(addressInputLaptop.value);
    console.log(addressInputMobile.value)
    let httpRes = await fetch(mapURL);
    let data = await httpRes.json();
    return data.features[0].center;
}

let getSatInfo = async () => {
    let latLonArr = await getLatLong();
    let satInput = document.querySelectorAll('input[name="satellite"]');
    let satVal;
    for (const sat of satInput) {
        if (sat.checked) {
            satVal = sat.value;
            break;
        }
    }
    console.log('satVal');
    console.log(satVal);
    let satURL = `https://satellites.fly.dev/passes/${satVal}?lat=${latLonArr[1]}&lon=${latLonArr[0]}&limit=1&days=15&visible_only=true`;
    console.log(satURL);
    let httpRes = await fetch(satURL);
    let data = await httpRes.json();
    riseDateTime.innerText = data[0].rise.utc_datetime;
    culminationDateTime.innerText = data[0].culmination.utc_datetime;
    setDateTime.innerText = data[0].set.utc_datetime;
}