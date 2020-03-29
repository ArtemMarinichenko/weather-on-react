import React from "react";
import "./App.css";
import Form from "./components/form/Form";
import Display from "./components/display/Display";

export default class App extends React.Component {
  state = {
    name: undefined,
    tempMin: undefined,
    tempMax: undefined,
    condition: undefined,
    description: undefined,
    country: undefined,
    humidity: undefined,
    alert: undefined
  };

  gettingCityApi = async cityName => {
    try {
      const myApiKey = "18acc07934ad7fa52e0c87730491e2dd";
      const dataApi = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApiKey}&units=metric`
      );
      const result = await dataApi.json();
      console.log(result);
      if (cityName) {
        this.setState({
          name: result.name,
          tempMin: result.main.temp_min,
          tempMax: result.main.temp_max,
          condition: result.weather[0].main,
          description: result.weather[0].description,
          country: result.sys.country,
          humidity: result.main.humidity,
          alert: undefined
        });
      } else {
        this.setState({
          name: undefined,
          tempMin: undefined,
          tempMax: undefined,
          condition: undefined,
          description: undefined,
          country: undefined,
          humidity: undefined,
          alert: "Please, enter city name!"
        });
      }
    } catch (e) {
      this.setState({
        name: "",
        tempMin: undefined,
        tempMax: undefined,
        condition: '',
        description: '',
        country: '',
        humidity: '',
        alert: "Uncorrect city name!"
      });
    }
  };

  toDay() {
    const arrDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const day = date.getDay();
    return arrDays[day];
  }

  currentMonth() {
    const arrMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const month = date.getMonth();
    return arrMonth[month];
  }

  componentDidMount() {
    this.gettingCityApi("chuhuiv");
  }

  render() {
    const { name, tempMin, tempMax, alert, humidity, description, country, condition } = this.state;

    let weather = "App";

    switch (condition) {
      case "Clear": weather = "clearSky";
        break;
      case "Clouds": weather = "clouds";
        break;
      case "Rain": weather = "rain";
        break;
      case "Mist": weather = "mist";
        break;
      case "Snow": weather = "snow";
        break;
      case "Thunderstorm": weather = "flashLight";
        break;
    }
   
    return (
      <div className={weather}>
        <div className="wrapper">
          <div className="container h-100">
            <div className="header w-100">
              <img
                src="https://pcntv.com/wp-content/uploads/2015/09/WW-new-logo-test-2-300x177.png"
                alt="logo-weather"
              />
              <Form methodGetCity={this.gettingCityApi} 
                    methodShowTempMin={tempMin}
                    methodShowTempMax={tempMax}
              />
              <div className="totalDateTime">
                <div className="d1">
                  <span className="month">{this.currentMonth()},</span> 
                  <span className="date">{new Date().getDate()}</span>                                                  
                </div>               
                <div className="d2">
                  <span className="day">{this.toDay()}</span>
                  <span className="year">{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>    
            <div className="content d-flex justify-content-center align-items-center">
              <Display
                methodCityName={name}
                methodCountry={country}
                methodTempMin={tempMin}
                methodTempMax={tempMax}
                methodCityAlert={alert}
                methodHumid={humidity}
                methodDescr={description}
              />
            </div>                    
          </div>
        </div>        
      </div>
    );
  }
}
