import React from 'react';

export const GenerationsBox = ({content, title}) => (
    <div className="world-items--wrapper generations">

        <div className="world-items--wrapper-title">{title}</div>
        { content.length > 0  &&
        <div className="generations-container">
            <div className="world-items">
                {content}
            </div>
        </div>
        }
    </div>
);
