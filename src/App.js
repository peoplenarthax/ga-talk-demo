import React, { Component } from 'react';
import './App.css';
import {setObjects, startGA} from './genetic-algorithm'
import {WorldItems} from "./ui/WorldItems";
import {Knapsack} from "./ui/Knapsack";

class App extends Component {
  state = {
    count: 0,
      bestIndividual: [],
      generations: [],
  }

  getItemsInChromosome = (chromosome) => chromosome.reduce((acc, item, index) => {
        return item === 1
            ? [...acc, this.props.items[index]]
            : acc
    }, []);

  startGa = () => {
      startGA({objects: this.props.items, best: this.bestIndividual}).then(() => console.log('It just finished'));
  }

  bestIndividual = (individual) => {
      const bestIndividual = this.getItemsInChromosome(individual.chromosome);

      this.setState(prevState => ({
          bestIndividual,
          generations: [...prevState.generations, individual]
      }));
  }

  showGen = (index) => () =>
  {
      this.setState({
          bestIndividual: this.getItemsInChromosome(this.state.generations[index].chromosome),
      });
  }
  render() {
      setObjects(this.props.items);

    return (
      <div className="App">
              <div className="main-pane">
                  <div className="input-boxes">
                    <button className="start-button" onClick={this.startGa}> Start </button>
                  </div>
                  <div className="stat-boxes">
                      {this.state.generations.map((gen, index) => <p key={gen.fitness} onClick={this.showGen(index)}>{gen.fitness}</p>)}
                  </div>
                  <WorldItems items={this.props.items} />
              </div>
            <Knapsack items={this.state.bestIndividual} />
      </div>
    );
  }
}

export default App;
