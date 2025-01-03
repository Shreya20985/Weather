const apikey="da6a81ff1acb294edaf96be4dd8977b1";

const weatherDataEl=document.getElementById("weather-data");

const cityInputEl=document.getElementById("city-input");

const formEl=document.querySelector("form");





formEl.addEventListener("submit",(event)=>{/*to change the action when the form is submitted*/
   
    event.preventDefault();/* by default when a form gets submitted then the page gets refreshed, but by doing this page will not get refreshed when the form is submitted*/
    const cityValue=cityInputEl.value;
    getWeatherData(cityValue);
}

);


async function getWeatherData(cityValue)/*asynchronous function is one that has some delay using await*/
{
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);/*await waits till the response comes and then moves to the next lines*/

        if(!response.ok){
            throw new Error("Network response was not ok") 
        }

        const data=await response.json();/*will convert the response to data*/
        const temperature=Math.round(data.main.temp);/*to round off the temperature to the nearest integer*/
        const description=data.weather[0].description;
        const icon=data.weather[0].icon;
        const details=[/*creating a dynamic array*/
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];

        weatherDataEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent=`${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent=description;
        weatherDataEl.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML="";
        weatherDataEl.querySelector(".temperature").textContent="";
        weatherDataEl.querySelector(".description").textContent="An error happened,please try again later";
        weatherDataEl.querySelector(".details").innerHTML="";
        
    }
}
