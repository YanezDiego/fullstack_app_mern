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


  // Gets data from DB.
  getDataFromDb = () => {
    fetch('http//localhost:3001/api/getData')
    .then(data => data.json())
    .then(resp => this.setState({data: resp.data}))
  }

  // post data to DB
  postDataToDb = message => {
    let currentIds = this.state.data.map(data => data.id)
    let idToBeAdded = 0
    while( currentIds.includes(idToBeAdded)){
      ++idToBeAdded;
    }

    axios.post("http//localhost:3001/api/putData", {
      id: idToBeAdded,
      message: message
    });
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
