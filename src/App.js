import React, { Component } from 'react';
import './App.css';
import {setObjects, startGA} from './genetic-algorithm'
import {WorldItems} from "./ui/WorldItems";
import {Knapsack} from "./ui/Knapsack";
class App extends Component {
  state = {
    count: 0,
      bestIndividual: [],
  }
  startGa = () => {
      startGA({objects: this.props.items, best: this.bestIndividual}).then(() => console.log('It just finished'));
  }

  bestIndividual = (individual) => {
      const bestIndividual = individual.reduce((acc, item, index) => {
          return item === 1
            ? [...acc, this.props.items[index]]
            : acc
      }, []);

      this.setState({bestIndividual});
  }

  render() {
      setObjects(this.props.items);

    return (
      <div className="App">
       <button onClick={this.startGa}> Start </button>
        <h1>{this.state.count}</h1>
          <WorldItems items={this.props.items} />
          <Knapsack items={this.state.bestIndividual} />
      </div>
    );
  }
}

export default App;
