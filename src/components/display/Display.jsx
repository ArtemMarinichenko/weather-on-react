import React from "react";
import "./display.css";

export default class Display extends React.Component {
  state = {};

  render() {
    const { methodCityName, methodTempMin, methodTempMax, methodCityAlert, methodHumid, methodDescr, methodCountry } = this.props;
    console.log()
    let tempMin = methodTempMin;
    let tempMax = methodTempMax;
    let cityTemp = "cityTemp";
    let cityName = "cityName";
    let humidity = "humidity";
    let description = "description";

    if (methodTempMin && methodTempMax ) {
      tempMin = Math.round(methodTempMin);
      tempMax = Math.round(methodTempMax);
    } 
    if(methodTempMin < 0 || methodTempMax < 0) {
      cityTemp += " cityTempCold";
      cityName += " shadowCold";
      humidity += " shadowColdDown";
      description += " shadowColdDown";
    }

    return (
      <div className="Display text-center">
        
        {methodCityName &&
          <div className="">
            <h1 className={cityName}>{methodCityName}, {methodCountry}</h1>
            <h3 className={cityTemp}>{tempMin}/{tempMax}&deg;C</h3>
            <div className={humidity}><span>humidity</span>: {methodHumid} %</div>
            <div className={description}><span>condition</span>: {methodDescr}</div>
          </div>
        }
        <p className="alert">{methodCityAlert}</p>
      </div>
    );
  }
}
