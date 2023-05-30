const apiUrl = "http://api.weatherapi.com/v1/forecast.json?key=";
let apiKey = "f45d0138ab9249b182e164544233005";

const input = document.querySelector(".card .search input");

async function Weather(city){
    
    const response = await fetch(apiUrl+`${apiKey}`+`&q=${city}&days=7`)
    //checking if respones is eror or not
    if(response.status == 400){

        document.querySelector(".card .weather").style.display = "none";
        document.querySelector(".week").style.display = "none";
        document.querySelector(".card .wrong").style.display = "block";

    }else{
        //if not convert response in json object to get info
        let data = await response.json();

        console.log(data);
        //Current Day Weather
        document.querySelector(".card .city").innerHTML = data.location.name;
        document.querySelector(".card .temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".card .weather img").src = "images/"+data.current.condition.code+".png";
        document.querySelector(".card .humidity").innerHTML = data.current.humidity+"%";
        document.querySelector(".card .wind").innerHTML = data.current.wind_kph+"km/h";

        //Forecast 7 Days
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        function week(day,dayA){
            document.querySelector(`.week .${day} .temp`).innerHTML = Math.round(data.forecast.forecastday[dayA].day.maxtemp_c) + "°C";
            document.querySelector(`.week .${day} .rainProcent`).innerHTML = data.forecast.forecastday[dayA].day.daily_chance_of_rain + "%";
            document.querySelector(`.week .${day} .weather-icon`).src = "images/" + data.forecast.forecastday[dayA].day.condition.code + ".png";
            let a = new Date(data.forecast.forecastday[dayA].date);
            document.querySelector(`.week .${day} h3`).innerHTML = days[a.getDay()];
        }
        //settings all day of the week
        week("day1",0);
        week("day2",1);
        week("day3",2);
        week("day4",3);
        week("day5",4);
        week("day6",5);
        week("day7",6);
        
        //setting displays to visible,and inivible, deleting input value
        document.querySelector(".card .weather").style.display = "block";
        document.querySelector(".card .wrong").style.display = "none";
        document.querySelector(".week").style.display = "flex";
        input.value = "";
    }
};

//listening for click or keypress(Enter)
document.querySelector(".card .search .btn").addEventListener("click",()=>{
    Weather(`${input.value}`);
});

input.addEventListener("keypress",(e)=>{
    if(e.key === 'Enter') Weather(`${input.value}`);
});