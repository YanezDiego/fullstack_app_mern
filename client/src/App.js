import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {

  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

    // when the component mounts we first call our get data from DB funciton
    // then incorporate a polling system to see if our db has changed and implement
    // the changes to our UI
  componentDidMount(){
    this.getDataFromDb();
    if(!this.state.intervalIsSet){
      let interval = setInterval(this.getDataFromDb, 1000)
      this.setState({intervalIsSet: interval})
    }
  };

  //killing the process after we are done using it

  componentWillUnmount(){
    if(this.state.intervalIsSet){
      clearInterval(this.state.intervalIsSet)
      this.setState({intervalIsSet: null})
    }
  }

  

  render() {
    return (
      <div>
        <h1>
          READY TO ADD BACKEND
        </h1>
      </div>
    );
  }
}

export default App;
