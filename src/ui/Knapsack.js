import React from 'react';
import {EquipmentItem} from "./EquipmentItem";

export const Knapsack = ({items}) => (
    <div className="world-items--wrapper">
        <div className="world-items--wrapper-title">Knapsack</div>
        <div className="world-items--inner-box knapsack">
        <div className="world-items">
            {items.map(item => <EquipmentItem key={`${Math.random()}${item.object}${item.weight}${item.value}`} itemInfo={item} />)}
        </div>
        </div>
    </div>
);
