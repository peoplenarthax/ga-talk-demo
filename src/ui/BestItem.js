import React from 'react';
import {EquipmentItem} from "./EquipmentItem";

export const BestItem = ({item}) => (
    <div className="world-items--wrapper">
        <div className="best-item-content">
        <div className="world-items--wrapper-title">Best Item</div>
        <div className="best-item-wrapper">
            <EquipmentItem itemInfo={item} />
        </div>
        </div>
    </div>
);
