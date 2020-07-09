/* Created Two Components 
import React, { Component } from 'react';
import Title from  './components/Title.js';
import Time from './components/Time.js';

class App extends Component {

constructor(){
  super();
  this.state = {
    cityName: '',
  }
}
/*Arrow Function
ChangeCityName=(newName)=> {
  this.setState({cityName:newName})
  console.log(this.state.cityName)
}

  render() {
    return(
      <div>
        <Title ChangeCityName={this.ChangeCityName}/>
      </div>
      
    );
}}

export default App; */
