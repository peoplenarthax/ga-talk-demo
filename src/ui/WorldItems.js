import React from 'react';
import {EquipmentItem} from "./EquipmentItem";

export const WorldItems = ({items}) => (
    <div className="world-items--wrapper">
        <div className="world-items--wrapper-title">All the items</div>
        <div className="world-items--inner-box">
            <div className="world-items">
                {items.map(item => <EquipmentItem key={`${Math.random()}${item.object}${item.weight}${item.value}`} itemInfo={item} />)}
            </div>
        </div>
    </div>
);
