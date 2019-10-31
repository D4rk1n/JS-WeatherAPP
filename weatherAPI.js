const apiKey = 'uY4ljA9H86LqKrqoIFJlIffsPRvahhKw';





const getCity = async (city)=> {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    const response =  await fetch(url);
    const data = await response.json();
    return data[0];
}
let d = null ;
let c = getCity('giza').then(data =>{
console.log(data);
d= data;
console.log(d);
});


