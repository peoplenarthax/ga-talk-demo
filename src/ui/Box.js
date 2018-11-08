import React from 'react';

export const Box = ({content, title}) => (
    <div className="world-items--wrapper">
        <div className="world-items--wrapper-title">{title}</div>
        <div className="world-items--inner-box">
            <div className="world-items">
                {content}
            </div>
        </div>
    </div>
);
