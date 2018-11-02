import React, { Component } from 'react';
import './App.css';
import {setObjects, startGA} from './genetic-algorithm'
import {EquipmentItem} from "./ui/EquipmentItem";
class App extends Component {
  state = {
    count: 0
  }
  startGa = (items) => () => {
      startGA({objects: items})
  }

  render() {
      setObjects(this.props.items);

    return (
      <div className="App">
       <button onClick={this.startGa(this.props.items)}> Start </button>
        <h1>{this.state.count}</h1>
          <div className="knap-sack" >
            {this.props.items.map(item => <EquipmentItem key={`${item.object}${item.weight}${item.value}`} itemInfo={item} />)}
          </div>
      </div>
    );
  }
}

export default App;
