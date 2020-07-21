import React, { Component } from "react"



class ConvCelFaren extends Component {
    constructor() {
        super();
        this.state = {
            temperature: "",
            scale: "F"

        };
    }
    
    // conversion of methods
    doConvert(temperature, convert) {
    //  function checks if the first character in the specified string is a number. If it is, it continues to parses the string until it reaches the end of the number, & returns  number as a number, not a string.
      const input = parseFloat(temperature);
      if (Number.isNaN(input)) {
        return "";
      }

      const output = convert(input);
      const rounded = Math.round(output * 1000) / 1000;
      return rounded.toString();
    }   
  
    toCelsius(fahrenheit) {
        return ((fahrenheit - 32) * 5) / 9;
    }
  
    toFahrenheit(celsius) {
        return (celsius * 9) / 5 + 32;
    }

    getResult = () => {
      const { scale, temperature } = this.state;
      const result =
        scale === "F"
          ? this.doConvert(temperature, this.toCelsius)
          : this.doConvert(temperature, this.toFahrenheit);
      const oppositeScale = scale === "F" ? "C" : "F";
  
      return `${result} degrees in ${oppositeScale}`;
    };
  
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    render() {
      // console.log(this.state.scale);
  
      return (
        <div className="converter">
          <hr />
          <br />
          <h1>Celsius vs Fahrenheit?</h1>
          <div className="paragraph">
            <p>Celsius and Fahrenheit both measrue the same thing, temperature. However, display different number spectrums, such as: Boiling water (at normal pressure) that measures 100° in Celsius or 212° in Fahrenheit. As water freezes it measues 0° and 32° in Fahrenheit.</p> 
          </div>
          <br />
          
          <div className="container">
            <p>We have provided a link for your convenience <a href="https://biodifferences.com/difference-between-celsius-and-fahrenheit.html/">Scholastic</a> to better inform and educate you in detail.</p>
          </div>
            <br />
            <hr />
            <br />
          <div className="text">
          <label>Select a scale to convert to:</label>
          <input
            type="radio"
            id="f"
            value="F"
            name="scale"
            onChange={this.handleChange}
            checked={this.state.scale === "F"}
          />
          <label htmlFor="f">Fahrenheit</label>
          <input
            type="radio"
            id="c"
            value="C"
            name="scale"
            onChange={this.handleChange}
            checked={this.state.scale === "C"}
          />
          <label htmlFor="c">Celcius</label>
          <br />
          <br />
          <label>Please Enter a Number: </label>
          <input
            type="text"
            name="temperature"
            onChange={this.handleChange}
            value={this.state.temperature}
          />
          <br />
  
          <div>
            {this.state.temperature} degrees 
            {this.state.scale} is equal to{" "}
            {this.getResult()}
          </div>
        </div>
      </div>
      );
    
  }
}
  export default ConvCelFaren;
  