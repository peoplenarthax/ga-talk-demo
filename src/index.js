import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { generateItems } from "./ui/createObjects";

const items = generateItems(140);

const bestItem = items.reduce((acc, actual) => {
    return actual.value/actual.weight > acc.value/acc.weight ? actual : acc
}, { value: 1, weight: 1});

ReactDOM.render(<App items={items} bestItem={bestItem} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
