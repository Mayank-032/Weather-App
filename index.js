document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          document.getElementById('navbar_top').classList.add('fixed-top');
          // add padding top to show content behind navbar
          navbar_height = document.querySelector('.navbar').offsetHeight;
          document.body.style.paddingTop = navbar_height + 'px';
        } else {
          document.getElementById('navbar_top').classList.remove('fixed-top');
           // remove padding top from body
          document.body.style.paddingTop = '0';
        } 
    });
}); 

function initMap(){
    var options = {
        zoom: 4, 
        center: {lat:20.5937, lng:78.9629}
    }

    // Adding a map
    var map = new google.maps.Map(document.getElementById('map'), options);

    google.maps.event.addListener(map, 'click', function(event){
        addMarker({coords: event.latLng});
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();

        WeatherReport(latitude, longitude);
        $(window).scrollTop($('#Days-data').position().top);
    });
    

    // Adding a marker
    // var marker = new google.maps.Marker({
    //     position: {lat:27.8974, lng:78.0880},
    //     map: map
    // });

    // var infoWindow = new google.maps.InfoWindow({
    //     content: '<h6>Aligarh, UP</h6>'
    // })

    // marker.addListener('click', function(){
    //     infoWindow.open(map, marker);
    // })

    // Array of Markers
    var markers = [
        {
            coords:{lat:27.8974, lng:78.0880},
            content: '<h6>Aligarh, UP</h6>'
        },

        {
            coords:{lat:19.0760, lng:72.8777},
            content: '<h6>Mumbai, Maharashtra</h6>'
        }, 

        {
            coords:{lat:28.7041, lng:77.1025},
            content: '<h6>New Delhi, Delhi</h6>'
        }
    ];

    // Loop through markers
    for(let i=0; i<markers.length; i++){
        addMarker(markers[i]);
    }

    function addMarker(props){
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });

        if(props.content){
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
        }
    }
}

let currWeatherData = document.getElementById('Days-data');
let currWeatherDataImg = document.getElementById('Days-data-img');
let city_name = document.getElementById('Select-days');

function WeatherReport(latitude, longitude){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&'+'lon='+longitude+'&'+'exclude=minutely&units=metric&appid=bbd672373a57758125b5a2c935617694')
        .then(response => response.json())
        .then(data => showWeatherReport(data))

    .catch(err => console.log(err));

    fetch('http://api.openweathermap.org/geo/1.0/reverse?lat='+latitude+'&lon='+longitude+'&limit=5&appid=bbd672373a57758125b5a2c935617694')
        .then(response1 => response1.json())
        .then(data1 => showCityName(data1))

    .catch(err => console.log(err));
}

function showWeatherReport(data){
    let str = (data.hourly[0].weather[0].description);
    let rain = false; let clouds = false; let snow = false; let clear = false; let thunderstorm = false;
    let ans = ``;

    let str1 = (data.hourly[2].weather[0].description);
    let rain1 = false; let clouds1 = false; let snow1 = false; let clear1 = false; let thunderstorm1 = false;
    let ans1 = ``;

    let str2 = (data.hourly[4].weather[0].description);
    let rain2 = false; let clouds2 = false; let snow2 = false; let clear2 = false; let thunderstorm2 = false;
    let ans2 = ``;

    let str3 = (data.hourly[6].weather[0].description);
    let rain3 = false; let clouds3 = false; let snow3 = false; let clear3 = false; let thunderstorm3 = false;
    let ans3 = ``;

    let str4 = (data.hourly[8].weather[0].description);
    let rain4 = false; let clouds4 = false; let snow4 = false; let clear4 = false; let thunderstorm4 = false;
    let ans4 = ``;

    let str5 = (data.hourly[10].weather[0].description);
    let rain5 = false; let clouds5 = false; let snow5 = false; let clear5 = false; let thunderstorm5 = false;
    let ans5 = ``;

    let str6 = (data.hourly[12].weather[0].description);
    let rain6 = false; let clouds6 = false; let snow6 = false; let clear6 = false; let thunderstorm6 = false;
    let ans6 = ``;

    
    if(str.includes("rain")) {
        rain = true;
        ans += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/rainy-1.svg" alt="Rainy">
        </div>`
        
    }else if(str.includes("clouds")) {
        clouds = true;
        ans += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/cloudy.svg" alt="Cloudy">
        </div>`
    }else if(str.includes("snow")) {
        snow = true;
        ans += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/snowy-6.svg" alt="Snowy">
        </div>`
    }else if(str.includes("clear")) {
        clear = true;
        ans += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/day.svg" alt="Sunny">
        </div>`
    }else if(str.includes("thunderstorm")) {
        thunderstorm = true;
        ans += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/thunder.svg" alt="Thunder">
        </div>`
    }

    if(str1.includes("rain")) {
        rain1 = true;
        ans1 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/rainy-1.svg" alt="Rainy">
        </div>`
    }else if(str1.includes("clouds")) {
        clouds1 = true;
        ans1 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/cloudy.svg" alt="Cloudy">
        </div>`
    }else if(str1.includes("snow")) {
        snow1 = true;
        ans1 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/snowy-6.svg" alt="Snowy">
        </div>`
    }else if(str1.includes("clear")) {
        clear1 = true;
        ans1 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/day.svg" alt="Sunny">
        </div>`
    }else if(str1.includes("thunderstorm")) {
        thunderstorm1 = true;
        ans1 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/thunder.svg" alt="Thunder">
        </div>`
    }



    if(str2.includes("rain")) {
        rain2 = true;
        ans2 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/rainy-1.svg" alt="Rainy">
        </div>`
    }else if(str2.includes("clouds")) {
        clouds2 = true;
        ans2 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/cloudy.svg" alt="Cloudy">
        </div>`
    }else if(str2.includes("snow")) {
        snow2 = true;
        ans2 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/snowy-6.svg" alt="Snowy">
        </div>`
    }else if(str2.includes("clear")) {
        clear2 = true;
        ans2 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/day.svg" alt="Sunny">
        </div>`
    }else if(str2.includes("thunderstorm")) {
        thunderstorm2 = true;
        ans2 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/thunder.svg" alt="Thunder">
        </div>`
    }



    if(str3.includes("rain")) {
        rain3 = true;
        ans3 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/rainy-1.svg" alt="Rainy">
        </div>`
    }else if(str3.includes("clouds")) {
        clouds3 = true;
        ans3 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/cloudy.svg" alt="Cloudy">
        </div>`
    }else if(str3.includes("snow")) {
        snow3 = true;
        ans3 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/snowy-6.svg" alt="Snowy">
        </div>`
    }else if(str3.includes("clear")) {
        clear3 = true;
        ans3 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/day.svg" alt="Sunny">
        </div>`
    }else if(str3.includes("thunderstorm")) {
        thunderstorm3 = true;
        ans3 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/thunder.svg" alt="Thunder">
        </div>`
    }

    if(str4.includes("rain")) {
        rain4 = true;
        ans4 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/rainy-1.svg" alt="Rainy">
        </div>`
    }else if(str4.includes("clouds")) {
        clouds4 = true;
        ans4 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/cloudy.svg" alt="Cloudy">
        </div>`
    }else if(str4.includes("snow")) {
        snow4 = true;
        ans4 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/snowy-6.svg" alt="Snowy">
        </div>`
    }else if(str4.includes("clear")) {
        clear4 = true;
        ans4 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/day.svg" alt="Sunny">
        </div>`
    }else if(str4.includes("thunderstorm")) {
        thunderstorm4 = true;
        ans4 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/thunder.svg" alt="Thunder">
        </div>`
    }
    if(str5.includes("rain")) {
        rain5 = true;
        ans5 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/rainy-1.svg" alt="Rainy">
        </div>`
    }else if(str5.includes("clouds")) {
        clouds5 = true;
        ans5 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/cloudy.svg" alt="Cloudy">
        </div>`
    }else if(str5.includes("snow")) {
        snow5 = true;
        ans5 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/snowy-6.svg" alt="Snowy">
        </div>`
    }else if(str5.includes("clear")) {
        clear5 = true;
        ans5 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/day.svg" alt="Sunny">
        </div>`
    }else if(str5.includes("thunderstorm")) {
        thunderstorm5 = true;
        ans5 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/thunder.svg" alt="Thunder">
        </div>`
    }

    if(str6.includes("rain")) {
        rain6 = true;
        ans6 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/rainy-1.svg" alt="Rainy">
        </div>`
    }else if(str6.includes("clouds")) {
        clouds6 = true;
        ans6 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/cloudy.svg" alt="Cloudy">
        </div>`
    }else if(str6.includes("snow")) {
        snow6 = true;
        ans6 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/snowy-6.svg" alt="Snowy">
        </div>`
    }else if(str6.includes("clear")) {
        clear6 = true;
        ans6 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/day.svg" alt="Sunny">
        </div>`
    }else if(str6.includes("thunderstorm")) {
        thunderstorm6 = true;
        ans6 += `<div>
            <img id="day-weather" src="/img/days-data-weather-img/thunder.svg" alt="Thunder">
        </div>`
    }


    currWeatherDataImg.innerHTML =
    ans + "\n\n" + ans1 + "\n\n" + ans2 + "\n\n" + ans3 + "\n\n" + ans4 + "\n\n" + ans5 + "\n\n" + ans6

    currWeatherData.innerHTML = 
    `<div class="card" style="width: 10.2rem; height: 17rem;">
        <img id="card-img" src="/img/cards.png" alt="Cards" style="width:10rem; height: 17rem;">
        <h3 id="weather-attribute-time">${window.moment(data.hourly[0].dt * 1000).format("h:mm a")}</h3>
        <h3 id="weather-attribute-humid">Humidity: ${data.hourly[0].humidity}</h3>
        <h3 id="weather-attribute-temp">Temp: ${data.hourly[0].temp}</h3>
        <h3 id="weather-attribute-pres">Press: ${data.hourly[0].pressure}</h3>
        <h3 id="weather-attribute-ws">Wind: ${data.hourly[0].wind_speed}</h3>
    </div>

    <div class="card" style="width: 10.2rem; height: 17rem;">
        <img id="card-img" src="/img/cards.png" alt="Cards" style="width:10rem; height: 17rem;">
        <h3 id="weather-attribute-time">${window.moment(data.hourly[2].dt * 1000).format("h:mm a")}</h3>
        <h3 id="weather-attribute-humid">Humidity: ${data.hourly[2].humidity}</h3>
        <h3 id="weather-attribute-temp">Temp: ${data.hourly[2].temp}</h3>
        <h3 id="weather-attribute-pres">Press: ${data.hourly[2].pressure}</h3>
        <h3 id="weather-attribute-ws">Wind: ${data.hourly[2].wind_speed}</h3>
    </div>

    <div class="card" style="width: 10.2rem; height: 17rem;">
        <img id="card-img" src="/img/cards.png" alt="Cards" style="width:10rem; height: 17rem;">
        <h3 id="weather-attribute-time">${window.moment(data.hourly[4].dt * 1000).format("h:mm a")}</h3>
        <h3 id="weather-attribute-humid">Humidity: ${data.hourly[4].humidity}</h3>
        <h3 id="weather-attribute-temp">Temp: ${data.hourly[4].temp}</h3>
        <h3 id="weather-attribute-pres">Press: ${data.hourly[4].pressure}</h3>
        <h3 id="weather-attribute-ws">Wind: ${data.hourly[4].wind_speed}</h3>
    </div>

    <div class="card" style="width: 10.2rem; height: 17rem;">
        <img id="card-img" src="/img/cards.png" alt="Cards" style="width:10rem; height: 17rem;">
        <h3 id="weather-attribute-time">${window.moment(data.hourly[6].dt * 1000).format("h:mm a")}</h3>
        <h3 id="weather-attribute-humid">Humidity: ${data.hourly[6].humidity}</h3>
        <h3 id="weather-attribute-temp">Temp: ${data.hourly[6].temp}</h3>
        <h3 id="weather-attribute-pres">Press: ${data.hourly[6].pressure}</h3>
        <h3 id="weather-attribute-ws">Wind: ${data.hourly[6].wind_speed}</h3>
    </div>

    <div class="card" style="width: 10.2rem; height: 17rem;">
        <img id="card-img" src="/img/cards.png" alt="Cards" style="width:10rem; height: 17rem;">
        <h3 id="weather-attribute-time">${window.moment(data.hourly[8].dt * 1000).format("h:mm a")}</h3>
        <h3 id="weather-attribute-humid">Humidity: ${data.hourly[8].humidity}</h3>
        <h3 id="weather-attribute-temp">Temp: ${data.hourly[8].temp}</h3>
        <h3 id="weather-attribute-pres">Press: ${data.hourly[8].pressure}</h3>
        <h3 id="weather-attribute-ws">Wind: ${data.hourly[8].wind_speed}</h3>
    </div>

    <div class="card" style="width: 10.2rem; height: 17rem;">
        <img id="card-img" src="/img/cards.png" alt="Cards" style="width:10rem; height: 17rem;">
        <h3 id="weather-attribute-time">${window.moment(data.hourly[10].dt * 1000).format("h:mm a")}</h3>
        <h3 id="weather-attribute-humid">Humidity: ${data.hourly[10].humidity}</h3>
        <h3 id="weather-attribute-temp">Temp: ${data.hourly[10].temp}</h3>
        <h3 id="weather-attribute-pres">Press: ${data.hourly[10].pressure}</h3>
        <h3 id="weather-attribute-ws">Wind: ${data.hourly[10].wind_speed}</h3>
    </div>

    <div class="card" style="width: 10.2rem; height: 17rem;">
        <img id="card-img" src="/img/cards.png" alt="Cards" style="width:10rem; height: 17rem;">
        <h3 id="weather-attribute-time">${window.moment(data.hourly[12].dt * 1000).format("h:mm a")}</h3>
        <h3 id="weather-attribute-humid">Humidity: ${data.hourly[12].humidity}</h3>
        <h3 id="weather-attribute-temp">Temp: ${data.hourly[12].temp}</h3>
        <h3 id="weather-attribute-pres">Press: ${data.hourly[12].pressure}</h3>
        <h3 id="weather-attribute-ws">Wind: ${data.hourly[12].wind_speed}</h3>
    </div>`
}

function showCityName(data){
    console.log(data);
    let ans = data[0].name;
    
    if(data[0].state != undefined){
        ans += ", " + data[0].state;
    }
    
    ans += ", " + data[0].country;

    city_name.innerHTML = 
    `<center><h1 id="CityName">${ans}</h1></center>`
}

var SearchBarCityName = document.getElementById("exampleInputCityName");
function SearchBarAPI(){
    let CityName = SearchBarCityName.value;
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+CityName+'&limit=5&appid=bbd672373a57758125b5a2c935617694')
        .then(response => response.json())
        .then(data => DisplayCityNameUsingUsingSearchBar(data))

    .catch(err => console.log(err));
}

function DisplayCityNameUsingUsingSearchBar(data){
    let latitude = data[0].lat;
    let longitude = data[0].lon;

    WeatherReport(latitude, longitude);
    $(window).scrollTop($('#Days-data-img').position().top);
}

let news_feed = document.getElementById('NewsFeed');

// newsReport();
function newsReport(){
    fetch('http://api.mediastack.com/v1/news?access_key=5f76ca02d982da8f9283ccd81690d20e&search=abc&categories=business,technology,science,sports,health&languages=en&offset=0&limit=100')
        .then(response => response.json())
        .then(data => showNewsAndArticles(data))

    .catch(err => console.log(err))
}

function showNewsAndArticles(data){
    news_feed.innerHTML = `
    <h1 style="margin-left: 40px; margin-top: 20px;">WorldWide News</h1>
    <div class="row">
        <div id="showNews" class="col-6">
            <a href=${data.data[0].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 40px; margin-top: 40px;">
                <div class="row no-gutters">
                    <div class="col-md-2">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[0].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[0].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[10].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 40px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[10].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[10].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[20].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 60px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[20].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[20].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[30].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 60px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[30].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[30].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[40].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 60px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[40].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[40].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[50].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 60px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[50].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[50].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[60].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 60px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[60].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[60].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[70].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 60px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[70].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[70].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[80].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 60px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[80].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[80].description}</p>
                        </div>
                    </div>
                </div>
            </a>

            <a href=${data.data[90].url} class="card" style="max-width: 540px; max-height: 120px; color: inherit; margin-left: 60px; margin-bottom: 60px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img style="width: 100%; height:100%;" src="/img/News_Img/news_img.jpg" alt="Weather-Img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[90].title}</h5>
                            <p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${data.data[90].description}</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>

        <div id="showArticles" style="margin-top: 40px;" class="col-6">
            <a href=${data.data[5].url} class="card" style="max-width: 340px; max-height: 320px; color: inherit; margin-top: 70px; margin-left: 120px; margin-bottom: 50px;">
                <img style="width: 100%; height:100%;" src="/img/News_Img/articles_img.jpg" class="card-img-top" alt="Aricles_img">
                <div class="card-body">
                    <h5 style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-title">${data.data[5].title}</h5>
                    <p style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-text">${data.data[5].description}</p>
                </div>
            </a>

            <a href=${data.data[25].url} class="card" style="max-width: 340px; max-height: 320px; color: inherit; margin-top: 35px; margin-left: 120px; margin-bottom: 50px;">
                <img style="width: 100%; height:100%;" src="/img/News_Img/articles_img.jpg" class="card-img-top" alt="Aricles_img">
                <div class="card-body">
                    <h5 style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-title">${data.data[25].title}</h5>
                    <p style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-text">${data.data[25].description}</p>
                </div>
            </a>

            <a href=${data.data[55].url} class="card" style="max-width: 340px; max-height: 320px; color: inherit; margin-top: 35px; margin-left: 120px; margin-bottom: 50px;">
                <img style="width: 100%; height:100%;" src="/img/News_Img/articles_img.jpg" class="card-img-top" alt="Aricles_img">
                <div class="card-body">
                    <h5 style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-title">${data.data[55].title}</h5>
                    <p style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-text">${data.data[55].description}</p>
                </div>
            </a>

            <a href=${data.data[75].url} class="card" style="max-width: 340px; max-height: 320px; color: inherit; margin-top: 35px; margin-left: 120px; margin-bottom: 50px;">
                <img style="width: 100%; height:100%;" src="/img/News_Img/articles_img.jpg" class="card-img-top" alt="Aricles_img">
                <div class="card-body">
                    <h5 style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-title">${data.data[75].title}</h5>
                    <p style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-text">${data.data[75].description}</p>
                </div>
            </a>
        </div>
    </div>

    <center>
        <img id="loading-bar" src="/img/three-dots.svg" alt="Loading">
        <a id="show-more" href="#"><h5 style="margin-bottom: 40px;">Show More</h5></a>
    </center>
    `
}
