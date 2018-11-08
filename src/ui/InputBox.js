import React from 'react';

export const InputBox = ({children, title}) => (
    <div className="world-items--wrapper">
        <div className="best-item-content">
            <div className="world-items--wrapper-title">{title}</div>
            <div className="best-item-wrapper">
                {children}
            </div>
        </div>
    </div>
);
