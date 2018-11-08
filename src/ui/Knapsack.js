import React from 'react';
import {EquipmentItem} from "./EquipmentItem";

export const Knapsack = ({selectedIndividual, maxWeight}) => {
    const {weight, value } = selectedIndividual.items.reduce((acc, item) => ({ weight: acc.weight + item.weight, value: acc.value + item.value}) ,{ weight: 0, value: 0});
    return (
    <div className="world-items--wrapper knapsack">
        <div className="world-items--wrapper-title ">Knapsack</div>
        <div className="world-items--inner-box knapsack">
        <div className="world-items">
            {selectedIndividual.items.map(item => <EquipmentItem key={`${Math.random()}${item.object}${item.weight}${item.value}`} itemInfo={item} />)}
        </div>
        </div>
        <div className="world-items--wrapper-bottom">Weight: <span className="our-weight">{weight}</span>/{maxWeight} | Value: {value}</div>

    </div>
)};
