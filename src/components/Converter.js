import React from 'react'




const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };
  
  function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }
  
  function tryConvert(value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }
  
  function TempArea(props) {     // if conditional gauging temperatures
    if (props.celsius >=100) {
      return <h5 className="hot">It's getting Hot in here! So take off all your ...!</h5>;
    }
    else if (props.celsius >=36.5 && props.celsius <=37.5) {
    return <h5 className="normal">Wow! The normal temperature of the human body!</h5>;
    }
     else if (props.celsius <=0) {
    return <h5 className="cold">Brr...Freezing cold out here!</h5>;
    }
    return null;
  }
  
  class Converter extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      this.props.onChange(e.target.value);
    }
  
    render() {
      const value = this.props.value;
      const scale = this.props.scale;
      return (
        <div className="container">
            <form>
              <div className= "form-group">
                <lable><h3>Enter Temperature in {scaleNames[scale]}: </h3></lable>
                <input className="form-control container text-center" id="focusedInputed" type="text" value={value}
                       onChange={this.handleChange} />
              </div>
            </form>
          </div>
        
      );
    }
  }
  
  class ConverterInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
      this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
      this.state = {value: '', scale: 'c'};
    }
  
    handleCelsiusChange(value) {
      this.setState({scale: 'c', value});
    }
  
    handleFahrenheitChange(value) {
      this.setState({scale: 'f', value});
    }
  
    render() {
      const scale = this.state.scale;
      const value = this.state.value;
      const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
      const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;
  
      return (
        <div className="text-center container-fluid">
          <Converter
            scale="c"
            value={celsius}
            onChange={this.handleCelsiusChange} />
          <Converter
            scale="f"
            value={fahrenheit}
            onChange={this.handleFahrenheitChange} />
          <TempArea
            celsius={parseFloat(celsius)} />
        </div>
      );
    }
  }
  
  export default Converter;
  