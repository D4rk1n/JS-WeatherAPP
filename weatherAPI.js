const apiKey = 'C6kCTuNGNzSUjh3ond9xDbiOhebJEMMs';




const getCity = async (city)=> {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const q = `?apikey=${apiKey}&q=${city}`;
    const response =  await fetch(url+q);
    const data = await response.json();
    console.log("City API returned ",data[0]);
    return data[0];
}

const getConditions = async (location) =>{
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${location}`;
    const q = `?apikey=${apiKey}`;
    const response =  await fetch(url+q);
    const data = await response.json();
    console.log("Condintions API returned ",data[0]);
    return data[0];
}
const getCurrLocation = async (latitude,longitude) => {
    const url = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    const q = `?apikey=${apiKey}&q=${latitude},${longitude}`;
    const response =  await fetch(url+q);
    const data = await response.json();
    console.log("Current location API returned ",data);
    return data;
}



