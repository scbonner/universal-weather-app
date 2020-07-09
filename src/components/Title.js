import React, { Component } from 'react';
import { render } from '@testing-library/react';


class Title extends Component {

  ChangeCityName= React.createRef();
  handleClick = () => {
  this.props.ChangeCityName(this.ChangeCityName.current.value);

  }
  render() {
    return(
      <div>
      <input placeholder='enterAcityName' type='text' ref={this.ChangeCityName} >
      </input>
      <button onClick={this.handleClick}> Search</button>
      </div>
    );
      
  }
    
}
export default Title;


