const form = document.querySelector(".change-city");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const timeImg = document.querySelector("img.time");
const condICO = document.querySelector(".icon img");
const myLocation = document.querySelector(".my-location");
console.log(condICO);


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
    condICO.setAttribute("src",`img/icons/${conditions.WeatherIcon}.svg`);
    if(card.classList.contains("d-none"))
        card.classList.remove("d-none");

}


form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    if(form.city.value.trim().length)
    {
        updateCity(form.city.value.trim())
        .then(data => updateUI(data))
        .catch(err => console.log(err.message));
        form.reset(); 
    }
    else {
        alert("Please Enter a City");
    }
  
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
            getCurrLocation(lat,lon)
            .then(loc=>{
                 return updateCity(loc.EnglishName);
            }).then(data => {
                updateUI(data);
            })
        }
        
        function error(err) {
            console.log(err)
        }
    }
    

})

        
