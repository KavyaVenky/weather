import './App.css';
import pic from './clear.png';

function About(){

    function picture(weather){
        if(weather.endsWith("night")){
            var image = weather.substring(0, weather.length-5);
        }
        else{
            var image = weather.substring(0, weather.length-3);
        }

        return image;
    }
    var weather = "tsrainday";
    
    //var image = "cloudy";
    return(
    <>
    <p>
        This is the about page.
    </p>
    <img src={"../images/"+ picture(weather) + ".png"}/>
    </>
    );
}

export default About;