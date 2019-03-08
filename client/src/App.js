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
