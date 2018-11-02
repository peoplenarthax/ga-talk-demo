import React, { Component } from 'react';


export const EquipmentItem = ({itemInfo}) => (
    <div className="knap-pack--item">
        <div className="info">asdasd</div>
        <img src={`../assets/${itemInfo.object}.png`} />
    </div>

)

export default EquipmentItem;
