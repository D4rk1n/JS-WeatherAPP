const form = document.querySelector(".change-city");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const timeImg = document.querySelector("img.time");
const myLocation = document.querySelector(".my-location");
console.log(timeImg);


const updateCity = async cityName => {
    const city = await getCity(cityName);
    const conditions = await getConditions(city.Key);
    return { city  , conditions}
}

function updateUI(data) {
    const{city , conditions} = data;
    console.log(city,conditions);
    details.innerHTML = `
    <h5 class="my-3" name="city">${city.EnglishName}</h5>
    <div class="my-3">${conditions.WeatherText}</div>
    <div class="display-4 my-4">
      <span name="temp">${conditions.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;
    if(conditions.IsDayTime)
    {
        timeImg.setAttribute("src","img/Day.svg");
        console.log("day");
    }
    else {
        timeImg.setAttribute("src","img/Night.svg");
    }

}


form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    updateCity(form.city.value.trim())
    .then(data => updateUI(data))
    .catch(err => console.log(err.message));
    form.reset(); 
})
form.addEventListener("keyup" , e => {
    //console.log(form.city.value.trim());
})
myLocation.addEventListener("click",e=>{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(success, error);
        let lat = undefined;
        let lon = undefined;
        function success(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            const data = getCurrLocation(lat,lon);
        }
        
        function error(err) {
            console.log(err)
        }
    }
    

})

        
