import React from 'react';

export const SomeStats = ({selectedIndividual, firstGeneration, timePerGeneration}) => (
    <div className="world-items--wrapper stats">
        <div className="best-item-content">
            <div className="world-items--wrapper-title">Stats</div>
            <div className="best-item-wrapper">
                {firstGeneration && <div>Improvement in fitness: <span className="improvement">+{selectedIndividual.fitness - firstGeneration.fitness}</span></div> }
                {timePerGeneration && <div>Time per generation: <span className="improvement">{timePerGeneration}s</span></div> }
            </div>
        </div>
    </div>
);
