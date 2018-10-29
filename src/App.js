import React, { Component } from 'react';
import './App.css';
import { startGA } from './genetic-algorithm'
class App extends Component {
  state = {
    count: 0
  }
  startGa = () => {
      startGA((number) => {
        this.setState({count: number})
      })
  }
  render() {
    return (
      <div className="App">
       <button onClick={this.startGa}> Start </button>
        <h1>{this.state.count}</h1>
      </div>
    );
  }
}

export default App;
