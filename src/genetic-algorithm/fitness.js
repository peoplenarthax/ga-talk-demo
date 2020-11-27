import {KNAPSACK} from "./knapsack";
import {contains, remove} from "ramda";

function getTotalWeightAndValue(individual, objects) {
    return individual.reduce(({weight, value}, objectIndex) =>
            ({ weight: weight + objects[objectIndex].weight, value: value + objects[objectIndex].value})
        , {weight: 0, value: 0});
}

export const fitnessKnapsack = (objects) => (genome) => {
    let includedObjectsIndex = genome.reduce((acc, val, ind) => val ?
        [...acc, ind]
        : acc
        , []);
    const objectsIncluded = includedObjectsIndex.length;

    let totalWeightAndValue = getTotalWeightAndValue(includedObjectsIndex, objects);
    while (totalWeightAndValue.weight > KNAPSACK.size) {
        const indexToRemove = Math.floor(Math.random() * includedObjectsIndex.length);
        const { weight, value } = objects[includedObjectsIndex[indexToRemove]];

        totalWeightAndValue = {
            weight: totalWeightAndValue.weight - weight,
            value: totalWeightAndValue.value - value,
        };

        includedObjectsIndex = remove(indexToRemove, 1, includedObjectsIndex);
    }

    if (objectsIncluded !== includedObjectsIndex.length) {
        return {
            genome: Array.from({
                length: genome.length
            }, (_, index) => contains(index, includedObjectsIndex) ? 1 : 0 ),
            fitness: totalWeightAndValue.value
        };
    }

    return {
        genome,
        fitness:totalWeightAndValue.value
    } 
}