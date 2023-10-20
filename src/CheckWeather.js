import { useState, useEffect } from "react";
import './App.css';


function CheckWeather() {

    
    // dropdown values
    const places = [
        {name:'Amsterdam', coord: [52.367,4.904]},
        {name:'Berlin', coord: [52.520,13.405]},
        {name:'Rome', coord: [41.902,12.496]},
        {name:'Athens', coord: [37.983,23.727]},
        {name:'London', coord: [51.507,-0.127]},
        {name:'Belfast', coord:[54.597,-5.930]},
        {name:'Budapest', coord:[59.329,18.068]},
        {name:'Edinburgh', coord:[55.953,-3.188]},
        {name:'French Riviera', coord:[43.254,6.637]},
        {name:'Oslo', coord:[59.913,10.752]}, 
        {name:'Vienna', coor:[18.208,16.373]},
        ];


    // states
    const [weather, setWeather] = useState([]);
    const [weatherData, setWeatherData] = useState([]);

    // setting selected value to the state
    function handleChange(event){
        setWeatherData([]); // empty previous api data
        setWeather(event.target.value);
        console.log("selected place", event.target.value);
    }      

    // api call whenever there is a change in the selected dropdown value
    useEffect(() => {
        fetch(`http://www.7timer.info/bin/api.pl?lon=${weather[1]}&lat=${weather[0]}&product=civil&output=json`)
        .then((resonse) => resonse.json())
        .then((data) => setWeatherData(data.dataseries.slice(0, 6+1)))
    }, [weather]);

    // dates array - for a week
    let currentdate = new Date();
    const dateArray = [];
    for(let i=0; i<7; i++){
        var newDate = new Date();
        newDate.setDate(currentdate.getDate()+i);
        dateArray.push(newDate.toDateString());
    }

    console.log("date array",dateArray);
    console.log("Weather Data ", weatherData);

    // function to get corresponding images

    function picture(weather){
        if(weather.endsWith("night")){
            var image = weather.substring(0, weather.length-5);
        }
        else{
            var image = weather.substring(0, weather.length-3);
        }

        return image;
    }

    return(
    <>

    <p>
        Choose place to check weather
    </p>

    <div>
    <select onChange={handleChange}>
        {places.map((p) =>
            <option value={p.coord}>
            {p.name}
        </option>)}
    </select>
    </div>

    <table className="table-design">
        <tbody>  
            <tr className="row-design">
            <th>Dates</th>
            {dateArray.map((d, ind) => {
                return(<td>{d}</td>)
            })}
            </tr>
            <tr className="row-design">
            <th>Weather</th>                 
            {weatherData.map((w, ind) => {
                return(
                <td>{w.weather}</td>
                )
            })}
            </tr>
            <tr className="row-design">
            <th>Temp(deg.C.)</th>                 
            {weatherData.map((w, ind) => {
                return(
                <td>{w.temp2m}</td>
                )
            })}
            </tr>
            <tr className="row-design">
            <th>Humidity(%)</th>                 
            {weatherData.map((w, ind) => {
                return(
                <td>{w.rh2m}</td>
            )
            })}
            </tr>
            <tr className="row-design">
            <th>Image</th>                 
            {weatherData.map((w, ind) => {
                return(
                <td><img src={"../images/"+ picture(w.weather) + ".png"}/></td>
            )
            })}
            </tr>
        
        </tbody>
    </table>

    </>

    );
    
}

export default CheckWeather;

