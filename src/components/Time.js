import React from 'react';
// eslint-disable-next-line
import moment from "moment";


class Time extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {date : new Date(), 
                  label: 'Eastern Daylight Time', 
                  css  : 'empty'};
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  
  
  //Lifecycle hooks
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  handleClick(){
    this.setState({
      label: 'Eastern Daylight Time',
      css  : 'clickedclock'
    });
    
    this.setState(prevState => ({
      // eslint-disable-next-line
      css: (prevState.css=='clickedclock')?'':'clickedclock'
    }));
  }
 
  render() {
    return (
            <div id="clockwrapper" className={this.state.css} onClick={this.handleClick}>
              <h1>{this.state.date.toLocaleTimeString()}</h1>
              <h2>{this.state.label}</h2> 
            </div>
           );
  }
}
// eslint-disable-next-line
function animateClock() {
  document.getElementById('clockwrapper').className = 'clocktick';
}

//Render only one ReactButton component
function tickTheClock(){

  
  
}


export default Time;
  

setInterval(tickTheClock, 1000);

 