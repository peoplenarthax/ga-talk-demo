import {KNAPSACK} from "./knapsack";
import {contains, remove} from "ramda";
import {random} from "./random";

function getTotalWeightAndValue(individual, objects) {
    return individual.reduce(({weight, value}, objectIndex) =>
            ({ weight: weight + objects[objectIndex].weight, value: value + objects[objectIndex].value})
        , {weight: 0, value: 0});
}

export function addFitness(chromosome, objects) {
    let includedObjectsIndex = chromosome.reduce((acc, val, ind) => val ?
        [...acc, ind]
        : acc
        , []);
    const objectsIncluded = includedObjectsIndex.length;

    let totalWeightAndValue = getTotalWeightAndValue(includedObjectsIndex, objects);
    while (totalWeightAndValue.weight > KNAPSACK.size) {
        const indexToRemove = Math.floor(random() * includedObjectsIndex.length);
        const { weight, value } = objects[includedObjectsIndex[indexToRemove]];

        totalWeightAndValue = {
            weight: totalWeightAndValue.weight - weight,
            value: totalWeightAndValue.value - value,
        };

        includedObjectsIndex = remove(indexToRemove, 1, includedObjectsIndex);
    }

    if (objectsIncluded !== includedObjectsIndex.length) {
        return {
            chromosome: Array.from({
                length: chromosome.length
            }, (_, index) => contains(index, includedObjectsIndex) ? 1 : 0 ),
            fitness: totalWeightAndValue.value
        };
    }

    return {
        chromosome,
        fitness: totalWeightAndValue.value
    }
}