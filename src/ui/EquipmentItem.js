import React from 'react';


export const EquipmentItem = ({itemInfo}) => (
    <div className="knap-pack--item">
        <div className="knap-pack--item-value">{itemInfo.value}</div>
        <img alt={itemInfo.object} src={`../assets/${itemInfo.object}.png`} />
        <div className="knap-pack--item-weight">{itemInfo.weight}</div>
    </div>

);
