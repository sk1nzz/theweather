import React from "react";
import { WiDaySunny, WiDaySunnyOvercast, WiDayCloudyHigh, WiDayCloudy, WiCloudy, WiThunderstorm, WiRainMix, WiRain, WiSnow, WiSleet, WiFog } from "weather-icons-react";

const sunnyGraidient = "linear-gradient(180deg, rgba(89,209,255,1) 0%, rgba(0,147,213,1) 100%)";
const partlyCloudyGradient = "linear-gradient(180deg, rgba(110,158,177,1) 0%, rgba(47,155,204,1) 100%)";
const overcastGradient = "linear-gradient(180deg, rgba(210,210,210,1) 0%, rgba(149,149,149,1) 100%)";

export function getBackgroundFromId(id: number){
    if(id >= 200 && id <= 799 || id == 804) return overcastGradient;
    if(id == 800) return sunnyGraidient;
    if(id >= 801 && id <=803) return partlyCloudyGradient;
}

export function getConditionFromId(id: number){

    // Осадки

    if(id >= 200 && id <= 232) return "Гроза";
    if(id >= 300 && id <= 321) return "Морось";
    if(id == 500 || id == 520) return "Небольшой дождь";
    if(id == 501 || id == 521) return "Дождь";
    if(id >= 502 && id <= 504 || id >= 522 && id <= 531) return "Сильный дождь";
    if(id == 511) return "Замерзающий дождь";
    if(id == 600 || id == 620) return "Небольшой снег";
    if(id == 601 || id == 621) return "Снег";
    if(id == 602 || id == 622) return "Снегопад";
    if(id >= 611 && id <= 616) return "Дождь со снегом";

    // Туман или дымка

    if(id >= 701 && id <= 781) return "Туман/дымка";

    // Ясно, облака

    if(id == 800) return "Ясно";
    if(id == 801) return "Малооблачно";
    if(id == 802) return "Переменная облачность";
    if(id == 803) return "Облачно";
    if(id == 804) return "Пасмурно";
}

export function WeatherIcon(props: any){

    // Без осадков

    if (props.id == 800) return <WiDaySunny size={72} />;
    if (props.id == 801) return <WiDaySunnyOvercast size={72} />;
    if (props.id == 802) return <WiDayCloudyHigh size={72} />;
    if (props.id == 803) return <WiDayCloudy size={72} />;
    if (props.id == 804) return <WiCloudy size={72} />;
    
    // Гроза

    if (props.id >= 200 && props.id <= 232) return <WiThunderstorm size={72} />;

    // Морось

    if (props.id >= 300 && props.id <= 321) return <WiRainMix size={72} />;

    // Дождь

    if (props.id >= 500 && props.id <= 531) return <WiRain size={72} />;

    // Снег, мокрый снег

    if (props.id >= 600 && props.id <= 602 || props.id >= 620 && props.id <= 622) return <WiSnow size={72} />;
    if (props.id >= 611 && props.id <= 616) return <WiSleet size={72} />;

    // Туман, дымка

    if (props.id >= 701 && props.id <= 781) return <WiFog size={72} />;
}