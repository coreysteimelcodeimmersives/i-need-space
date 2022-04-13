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
    if (data.features == null) {
        return 'bad address';
    } else {
        return data.features[0].center;
    }
}

let getSatInfo = async () => {
    let latLonArr = await getLatLong();
    if (latLonArr == 'bad address') {
        alert('Something is not right.\nPlease try a different address.');
    } else {
        console.log('latLonArr')
        console.log(latLonArr);
        if (latLonArr < 2 || !latLonArr) {
            alert('Something is not right.\nPlease try a different address.');
        }
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
        console.log('sat url')
        console.log(satURL);
        let httpRes = await fetch(satURL);
        let data = await httpRes.json();
        console.log('data');
        console.log(data);
        if (data.length < 1) {
            alert('Something is not right.\nPlease try a different address, NORDA Id, or both.');
            riseDateTime.innerText = '';
            culminationDateTime.innerText = '';
            setDateTime.innerText = '';
        } else {
            let riseTimeVar = data[0].rise.utc_datetime;
            // riseTimeVar = new Date(riseTimeVar);
            // console.log('formatted date time');
            // console.log(riseTimeVar);
            // let riseMonth = monthName(Date.prototype.getMonth(riseTimeVar));
            // let riseDayOfWeek = dayName(Date.prototype.getDay(riseTimeVar)); 
            // let riseDate = Date.prototype.getDate(riseTimeVar);
            // let riseHour = twelveHourTime(Date.prototype.getHours(riseTimeVar));
            // let riseMin = formatFiftyNineTime(Date.prototype.getMinutes(riseTimeVar));
            // let riseSec = formatFiftyNineTime(Date.prototype.getSeconds(riseTimeVar));
            // let riseAmPm = getAmPm(Date.prototype.getHours(riseTimeVar));
            // riseDateTime.innerText = `${riseDayOfWeek}, ${riseMonth} ${riseDate} at ${riseHour}:${riseMin}.${riseSec} ${riseAmPm}`;
            riseDateTime.innerText = data[0].rise.utc_datetime;
            culminationDateTime.innerText = data[0].culmination.utc_datetime;
            setDateTime.innerText = data[0].set.utc_datetime;
        }
    }
}

let getAmPm = (num) => {
    if (num > 11){
        return 'pm'
    } else {
        return 'am'
    }
}

let formatFiftyNineTime = (num) => {
    if (num < 10){
        return '0'+num;
    } else {
        return num;
    }
}

let twelveHourTime = (num) => {
    if (num > 12){
        return num - 12;
    } else if (num == 0){
        return 12;
    } else {
        return num;
    }
}

let dayName = (num) => {
    if (num == 0){
        return 'Sunday'
    } else if (num == 1){
        return 'Monday'
    } else if (num == 2){
        return 'Tuesday'
    } else if (num == '3'){
        return 'Wednesday'
    } else if (num == '4'){
        return 'Thursday'
    } else if (num == '5'){
        return 'Friday'
    } else if (num == '6'){
        return 'Saturday'
    }
};

let monthName = (num) => {
    if (num == 0){
        return 'Jan'
    } else if (num == 1){
        return 'Feb'
    } else if (num == 2){
        return 'Mar'
    } else if (num == 3){
        return 'Apr'
    } else if (num == 4){
        return 'May'
    } else if (num == 5){
        return 'Jun'
    } else if (num == 6){
        return 'Jul'
    } else if (num == 7){
        return 'Aug'
    } else if (num == 8){
        return 'Sep'
    } else if (num == 9){
        return 'Oct'
    } else if (num == 10){
        return 'Nov'
    } else if (num == 11){
        return 'Dec'
    }
}