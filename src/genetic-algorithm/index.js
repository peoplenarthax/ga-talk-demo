import { GARunner, onePointCrossOver, flipMutation, selectByTournament } from "chromosome-js"

import {generateRandomBinaryArray} from './utils'
import {fitnessKnapsack} from "./fitness";

let objects;
// TODO: Create prototype so setters and getters go there
export const setObjects = (newObjects) => {
    objects = newObjects;
}

export const getObjects = () => {
    return objects;
}

const generateRandomIndividual = () => {
    const chromosome = generateRandomBinaryArray(getObjects().length);

    return fitnessKnapsack(getObjects())(chromosome)
};

export const startGA = async ({ onNewGeneration, gaParameters }) => {
    const config = {
        populationSize: gaParameters.populationSize,
        mutationProbability: gaParameters.mutationProb / 10,
        crossoverProbability: gaParameters.crossoverProb / 10,
        individualValidation: true, 
        tournamentSize: 5,
        generations: 999
    }
    setTimeout(() =>
        GARunner({ 
            seed: generateRandomIndividual,
            fitness:fitnessKnapsack(getObjects()), 
            mutation: flipMutation, 
            crossover: onePointCrossOver, 
            selection: selectByTournament, 
            config, 
            hooks: {
                onGeneration: onNewGeneration
            } }), 0
    )
};
