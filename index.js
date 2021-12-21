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
        $(window).scrollTop($('#Days-data-img').position().top);
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
    // var markers = [
    //     {
    //         coords:{lat:27.8974, lng:78.0880},
    //         content: '<h6>Aligarh, UP</h6>'
    //     },

    //     {
    //         coords:{lat:19.0760, lng:72.8777},
    //         content: '<h6>Mumbai, Maharashtra</h6>'
    //     }, 

    //     {
    //         coords:{lat:28.7041, lng:77.1025},
    //         content: '<h6>New Delhi, Delhi</h6>'
    //     }
    // ];

    // Loop through markers
    // for(let i=0; i<markers.length; i++){
    //     addMarker(markers[i]);
    // }

    function addMarker(props){
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });

        // if(props.content){
        //     // var infoWindow = new google.maps.InfoWindow({
        //     //     content: props.content
        //     // });

        //     // marker.addListener('click', function(){
        //     //     infoWindow.open(map, marker);
        //     // });
        // }
    }
}

let currWeatherData = document.getElementById('Days-data');
let currWeatherDataImg = document.getElementById('Days-data-img');
let city_name = document.getElementById('Select-days');
let chart_section = document.getElementById('chart-section');

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

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let months = [".,", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function showWeatherReport(data){
    let max = data.hourly[0].temp; 
    let min = data.hourly[0].temp; 
    for(let i=0; i<48; i++){
        max = Math.max(max, data.hourly[i].temp);
        min = Math.min(min, data.hourly[i].temp);
    }

    let chartVerticalData = [];
    min = min - 10;
    max = max + 10;
    chartVerticalData.push(min);
    for(let i=0; i<48; i++){
        chartVerticalData.push(data.hourly[i].temp);
    }
    chartVerticalData.push(max);

    let chartHorizontalData = [];
    for(let i=0; i<48; i++){
        chartHorizontalData.push(moment(data.hourly[i].dt * 1000).format('h:mm a'));
    }
    

    let date0 = new Date();
    date0.setDate(date0.getDate()+0);
    let resDate0 = days[date0.getDay()] + ", " + months[date0.getMonth() + 1] + " " + date0.getDate();

    let date1 = new Date();
    date1.setDate(date1.getDate()+1);
    let resDate1 = days[date1.getDay()] + ", " + months[date1.getMonth() + 1] + " " + date1.getDate();

    let date2 = new Date();
    date2.setDate(date2.getDate()+2);
    let resDate2 = days[date2.getDay()] + ", " + months[date2.getMonth() + 1] + " " + date2.getDate();

    let date3 = new Date();
    date3.setDate(date3.getDate()+3);
    let resDate3 = days[date3.getDay()] + ", " + months[date3.getMonth() + 1] + " " + date3.getDate();

    let date4 = new Date();
    date4.setDate(date4.getDate()+4);
    let resDate4 = days[date4.getDay()] + ", " + months[date4.getMonth() + 1] + " " + date4.getDate();

    let date5 = new Date();
    date5.setDate(date5.getDate()+5);
    let resDate5 = days[date5.getDay()] + ", " + months[date5.getMonth() + 1] + " " + date5.getDate();

    let date6 = new Date();
    date6.setDate(date6.getDate()+6);
    let resDate6 = days[date6.getDay()] + ", " + months[date6.getMonth() + 1] + " " + date6.getDate();

    
    let str = (data.daily[0].weather[0].description);
    let rain = false; let clouds = false; let snow = false; let clear = false; let thunderstorm = false;
    let ans = ``;

    let str1 = (data.daily[1].weather[0].description);
    let rain1 = false; let clouds1 = false; let snow1 = false; let clear1 = false; let thunderstorm1 = false;
    let ans1 = ``;

    let str2 = (data.daily[2].weather[0].description);
    let rain2 = false; let clouds2 = false; let snow2 = false; let clear2 = false; let thunderstorm2 = false;
    let ans2 = ``;

    let str3 = (data.daily[3].weather[0].description);
    let rain3 = false; let clouds3 = false; let snow3 = false; let clear3 = false; let thunderstorm3 = false;
    let ans3 = ``;

    let str4 = (data.daily[4].weather[0].description);
    let rain4 = false; let clouds4 = false; let snow4 = false; let clear4 = false; let thunderstorm4 = false;
    let ans4 = ``;

    let str5 = (data.daily[5].weather[0].description);
    let rain5 = false; let clouds5 = false; let snow5 = false; let clear5 = false; let thunderstorm5 = false;
    let ans5 = ``;

    let str6 = (data.daily[6].weather[0].description);
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
    `<div id="days-data-card" class="card">
        <div class="card-inner">
            <div class="card-front">
                <h3 id="weather-attribute-Date">${resDate0}</h3>
                <img src="/img/card-back-img3.jpg" style="width:9rem; height: 12rem">
            </div>
                
            <div class="card-back">
                <h3 id="weather-attribute-humid"><strong>Humidity: ${data.daily[0].humidity} </strong> </h3>
                <h3 id="weather-attribute-temp"><strong>Temperature: ${data.daily[0].temp.day} </strong> </h3>
                <h3 id="weather-attribute-pres"><strong>Pressure: ${data.daily[0].pressure} </strong> </h3>
                <h3 id="weather-attribute-ws"><strong>Wind-Speed: ${data.daily[0].wind_speed} </strong> </h3>
            </div>
        </div>
    </div>

    <div id="days-data-card" class="card">
        <div class="card-inner">
            <div class="card-front">
                <h3 id="weather-attribute-Date">${resDate1}</h3>
                <img src="/img/card-back-img3.jpg" style="width:9rem; height: 12rem">
            </div>
                      
            <div class="card-back">
                <h3 id="weather-attribute-humid"> <strong>Humidity: ${data.daily[1].humidity} </strong></h3>
                <h3 id="weather-attribute-temp"><strong>Temperature: ${data.daily[1].temp.day} </strong></h3>
                <h3 id="weather-attribute-pres"><strong>Pressure: ${data.daily[1].pressure} </strong></h3>
                <h3 id="weather-attribute-ws"><strong>Wind-Speed: ${data.daily[1].wind_speed} </strong></h3>
            </div>
        </div>
    </div>

    <div id="days-data-card" class="card">
        <div class="card-inner">
            <div class="card-front">
                <h3 id="weather-attribute-Date">${resDate2}</h3>
                <img src="/img/card-back-img3.jpg" style="width:9rem; height: 12rem">
            </div>
                      
            <div class="card-back">
                <h3 id="weather-attribute-humid"><strong>Humidity: ${data.daily[2].humidity} </strong></h3>
                <h3 id="weather-attribute-temp"><strong>Temperature: ${data.daily[2].temp.day} </strong></h3>
                <h3 id="weather-attribute-pres"><strong>Pressure: ${data.daily[2].pressure} </strong></h3>
                <h3 id="weather-attribute-ws"><strong>Wind-Speed: ${data.daily[2].wind_speed} </strong></h3>
            </div>
        </div>
    </div>

    <div id="days-data-card" class="card">
        <div class="card-inner">
            <div class="card-front">
                <h3 id="weather-attribute-Date">${resDate3}</h3>
                <img src="/img/card-back-img3.jpg" style="width:9rem; height: 12rem">
            </div>
                      
            <div class="card-back">
                <h3 id="weather-attribute-humid"><strong>Humidity: ${data.daily[3].humidity} </strong></h3>
                <h3 id="weather-attribute-temp"><strong>Temperature: ${data.daily[3].temp.day} </strong></h3>
                <h3 id="weather-attribute-pres"><strong>Pressure: ${data.daily[3].pressure} </strong></h3>
                <h3 id="weather-attribute-ws"><strong>Wind-Speed: ${data.daily[3].wind_speed} </strong></h3>
            </div>
        </div>
    </div>

    <div id="days-data-card" class="card">
        <div class="card-inner">
            <div class="card-front">
                <h3 id="weather-attribute-Date">${resDate4}</h3>
                <img src="/img/card-back-img3.jpg" style="width:9rem; height: 12rem">
            </div>
                      
            <div class="card-back">
                <h3 id="weather-attribute-humid"><strong>Humidity: ${data.daily[4].humidity} </strong></h3>
                <h3 id="weather-attribute-temp"><strong>Temperature: ${data.daily[4].temp.day} </strong></h3>
                <h3 id="weather-attribute-pres"><strong>Pressure: ${data.daily[4].pressure} </strong></h3>
                <h3 id="weather-attribute-ws"><strong>Wind-Speed: ${data.daily[4].wind_speed} </strong></h3>
            </div>
        </div>
    </div>

    <div id="days-data-card" class="card">
        <div class="card-inner">
            <div class="card-front">
                <h3 id="weather-attribute-Date">${resDate5}</h3>
                <img src="/img/card-back-img3.jpg" style="width:9rem; height: 12rem">
            </div>
                      
            <div class="card-back">
                <h3 id="weather-attribute-humid"><strong>Humidity: ${data.daily[5].humidity} </strong></h3>
                <h3 id="weather-attribute-temp"><strong>Temperature: ${data.daily[5].temp.day} </strong></h3>
                <h3 id="weather-attribute-pres"><strong>Pressure: ${data.daily[5].pressure} </strong></h3>
                <h3 id="weather-attribute-ws"><strong>Wind-Speed: ${data.daily[5].wind_speed} </strong></h3>
            </div>
        </div>
    </div>

    <div id="days-data-card" class="card">
        <div class="card-inner">
            <div class="card-front">
                <h3 id="weather-attribute-Date">${resDate6}</h3>
                <img src="/img/card-back-img3.jpg" style="width:9rem; height: 12rem">
            </div>
                      
            <div class="card-back">
                <h3 id="weather-attribute-humid"><strong>Humidity: ${data.daily[6].humidity} </strong></h3>
                <h3 id="weather-attribute-temp"><strong>Temperature: ${data.daily[6].temp.day} </strong></h3>
                <h3 id="weather-attribute-pres"><strong>Pressure: ${data.daily[6].pressure} </strong></h3>
                <h3 id="weather-attribute-ws"><strong>Wind-Speed: ${data.daily[6].wind_speed} </strong></h3>
            </div>
        </div>
    </div>`

    chart_section.innerHTML = 
    `<div>
        <canvas style=" margin-left: 20px; margin-bottom: 50px; width: 50%; height: 40%" id="myChart"></canvas>
    </div>
    `

    displayChart(chartVerticalData, data, chartHorizontalData);
}

function showCityName(data){
    // console.log(data);
    let ans = data[0].name;
    
    if(data[0].state != undefined){
        ans += ", " + data[0].state;
    }
    
    ans += ", " + data[0].country;

    city_name.innerHTML = 
    `<center><h1 id="CityName">${ans}</h1></center>`
}

function displayChart(chartVerticalData, data, chartHorizontalData){
    // creating a chart
    const labels = chartHorizontalData;

    const dataContainer = {
        labels: labels,
        datasets: [{
            label: 'Temperature(in celcius) per hour',
            backgroundColor: 'rgb(156, 13, 0)',
            borderColor: 'rgb(156, 13, 0)',

            data: chartVerticalData
        }]
    };

    const config = {
        type: 'line',
        data: dataContainer,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            devicePixelRatio: window.devicePixelRatio,
            animations: {
                tension: {
                  duration: 10000,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: true
                }
            },
            scales: {
                y: { // defining min and max so hiding the dataset does not change scale range
                  min: -100,
                  max: 100
                }
            },
        },
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
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


showNews();
function showNews(){
    fetch('https://newsapi.org/v2/everything?domains=thenextweb.com,bbc.co.uk&apiKey=482442d496674a29a974b271c24cbe2c')
        .then(response => response.json())
        .then(data => showData(data))

    .catch(err => console.log(err));
}

let newsAndArticles = document.getElementById('news');
function showData(data){
    console.log(data);
    
    newsAndArticles.innerHTML = 
    `
    <div class="news-report">
        <a href=${data.articles[0].url} id="news-card" class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="card-img" src=${data.articles[0].urlToImage} alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="margin-left:12px;">${data.articles[0].title}</h5>
                        <p class="card-text" style="margin-left:12px;">${data.articles[0].description}</p>
                    </div>
                </div>
            </div>
        </a>

        <a href=${data.articles[1].url} id="news-card" class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="card-img" src=${data.articles[1].urlToImage} alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="margin-left:12px;">${data.articles[1].title}</h5>
                        <p class="card-text" style="margin-left:12px;">${data.articles[1].description}</p>
                    </div>
                </div>
            </div>
        </a>

        <a href=${data.articles[13].url} id="news-card" class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="card-img" src=${data.articles[13].urlToImage} alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="margin-left:12px;">${data.articles[13].title}</h5>
                        <p class="card-text" style="margin-left:12px;">${data.articles[13].description}</p>
                    </div>
                </div>
            </div>
        </a>

        <a href=${data.articles[3].url} id="news-card" class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="card-img" src=${data.articles[3].urlToImage} alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="margin-left:12px;">${data.articles[3].title}</h5>
                        <p class="card-text" style="margin-left:12px;">${data.articles[3].description}</p>
                    </div>
                </div>
            </div>
        </a>

        <a href=${data.articles[4].url} id="news-card" class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="card-img" src=${data.articles[4].urlToImage} alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="margin-left:12px;">${data.articles[4].title}</h5>
                        <p class="card-text" style="margin-left:12px;">${data.articles[4].description}</p>
                    </div>
                </div>
            </div>
        </a>

        <a href=${data.articles[5].url} id="news-card" class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="card-img" src=${data.articles[5].urlToImage} alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="margin-left:12px;">${data.articles[5].title}</h5>
                        <p class="card-text" style="margin-left:12px;">${data.articles[5].description}</p>
                    </div>
                </div>
            </div>
        </a>

        <a href=${data.articles[6].url} id="news-card" class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="card-img" src=${data.articles[6].urlToImage} alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="margin-left:12px;">${data.articles[6].title}</h5>
                        <p class="card-text" style="margin-left:12px;">${data.articles[6].description}</p>
                    </div>
                </div>
            </div>
        </a>

        <a href=${data.articles[7].url} id="news-card" class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="card-img" src=${data.articles[7].urlToImage} alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style="margin-left:12px;">${data.articles[7].title}</h5>
                        <p class="card-text" style="margin-left:12px;">${data.articles[7].description}</p>
                    </div>
                </div>
            </div>
        </a>
    </div>

    <div class="article">
        <a href=${data.articles[8].url} id="news-article" class="card">
            <img src=${data.articles[8].urlToImage} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.articles[8].title}</h5>
                <p class="card-text">${data.articles[8].description}</p>
            </div>
        </a>

        <a href=${data.articles[9].url} id="news-article" class="card">
            <img src=${data.articles[9].urlToImage} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.articles[9].title}</h5>
                <p class="card-text">${data.articles[9].description}</p>
            </div>
        </a>

        <a href=${data.articles[10].url} id="news-article" class="card">
            <img src=${data.articles[10].urlToImage} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.articles[10].title}</h5>
                <p class="card-text">${data.articles[10].description}</p>
            </div>
        </a>

        <a href=${data.articles[11].url} id="news-article" class="card">
            <img src=${data.articles[11].urlToImage} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.articles[11].title}</h5>
                <p class="card-text">${data.articles[11].description}</p>
            </div>
        </a>

        <a href=${data.articles[12].url} id="news-article" class="card">
            <img src=${data.articles[12].urlToImage} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.articles[12].title}</h5>
                <p class="card-text">${data.articles[12].description}</p>
            </div>
        </a>
    </div>
    `
}