import React, { Component } from 'react';
import './App.css';
import {setObjects, startGA} from './genetic-algorithm'
import {WorldItems} from "./ui/WorldItems";
import {Knapsack} from "./ui/Knapsack";
import {BestItem} from "./ui/BestItem";
import {GenerationsBox} from "./ui/GenerationsBox";
import {KNAPSACK} from "./genetic-algorithm/knapsack";
import {SomeStats} from "./ui/SomeStats";
import {InputBox} from "./ui/InputBox";

class App extends Component {
  state = {
    count: 0,
      bestIndividual: { items: [], fitness: 0 },
      generations: [],
      mutationProb: 40,
      crossoverProb: 70,
      populationSize: 100
  }

  componentDidMount() {
    setObjects(this.props.items);
  }

  getItemsInChromosome = (chromosome) => chromosome.reduce((acc, item, index) => {
        return item === 1
            ? [...acc, this.props.items[index]]
            : acc
    }, []);

  startGa = () => {
      this.setState({generations: []})
      startGA({
        onNewGeneration: this.onNewGeneration,
        gaParameters: {
            mutationProb: this.state.mutationProb,
            crossoverProb: this.state.crossoverProb,
            populationSize: this.state.populationSize,
        }
    })
  }

    onNewGeneration = (population, generation) => {
      const individual = population[0]

      if (individual.fitness > this.state.bestIndividual.fitness) {
        const bestIndividual = { items: this.getItemsInChromosome(individual.genome), fitness: individual.fitness, generation};

        this.setState(prevState => ({
            bestIndividual,
            generations: [...prevState.generations, {...individual, generation}]
        }));
      }
      
  }

  showGen = (index) => () =>
  {
      this.setState({
          bestIndividual:
              {
                  items: this.getItemsInChromosome(this.state.generations[index].genome),
                  fitness: this.state.generations[index].fitness
              }
      });
  }

  changeMutation = (event) => {
      const mutationProb = event.target.value;
      this.setState({mutationProb})
  }

  changeCrossover = (event) => {
        const crossoverProb = event.target.value;
        this.setState({crossoverProb})
    }

    changePopulation = (event) => {
        const populationSize = event.target.value;
        this.setState({populationSize})
    }

  render() {
      
    return (
      <div className="App">
              <div className="main-pane">
                  <div className="input-boxes">
                    <button className="start-button" onClick={this.startGa}> Start </button>
                         <InputBox title="Population Size">
                             <input type="number" onChange={this.changePopulation} value={this.state.populationSize} />

                         </InputBox>
                      <InputBox title="Mutation Prob. (%)">
                          <input type="number" onChange={this.changeMutation} value={this.state.mutationProb} />
                      </InputBox>
                      <InputBox title="Crossover Prob. (%)">
                          <input type="number" onChange={this.changeCrossover} value={this.state.crossoverProb} />
                      </InputBox>
                  </div>
                  <div className="stat-boxes">
                      <BestItem item={this.props.bestItem} />
                      <GenerationsBox title="Generations"
                        content={this.state.generations.map((gen, index) => <div key={gen.generation} className="generation-button" onClick={this.showGen(index)}>Generation {gen.generation}</div>)}
                      />
                      <SomeStats
                          selectedIndividual={this.state.bestIndividual}
                          firstGeneration={this.state.generations[0]}
                      />
                  </div>
                  <WorldItems items={this.props.items} />
              </div>
            <Knapsack selectedIndividual={this.state.bestIndividual} maxWeight={KNAPSACK.size} />
      </div>
    );
  }
}

export default App;
