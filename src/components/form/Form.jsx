import React from "react";
import "./form.css";

export default class Form extends React.Component {
  state = { cityName: "" };

  changeCity = event => {
    this.setState({
      cityName: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.methodGetCity(this.state.cityName);
    this.setState({
      cityName: ""
    });
  };

  render() {
    const { methodShowTempMin, methodShowTempMax } = this.props;
    let shadow = "darkShadow";
    if (methodShowTempMin !== undefined || methodShowTempMax !== undefined) {
      shadow = "lightShadow";
    }

    return (
      <form className="Form mt-4" onSubmit={this.handleSubmit}>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search city"
            value={this.state.cityName}
            onChange={this.changeCity}
          />
          <button type="submit" className={shadow}>
            Show weather
          </button>
        </div>
        {/* <div className="manual mt-4">
          <p>Enter the name of the city in English !</p>
        </div> */}
      </form>
    );
  }
}
