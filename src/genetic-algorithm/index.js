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
        } }), 0)

    // return new Promise((resolve) => {
    //     const initialPopulation = generateInitialPopulation(POPULATION_SIZE, objects);
    //     let population = Array.from(initialPopulation);
    //     for (let i = 0; i < GENERATIONS; i++) {
    //         // TODO: Better handling async
    //         setTimeout(() => {
    //         console.log(`${i} generation/ BEST INDIVIDUAL: `, population[0]);
    //         let nextPopulation = [population[0], population[1]];
    //         while (nextPopulation.length !== initialPopulation.length) {
    //             const [selectedIndividual1, selectedIndividual2] = tournament(2, population, { tournamentSize: TOURNAMENT_SIZE, removeWinners: true });

    //             if (rng() < CROSSOVER_PROB) {
    //                 const offspring = generateOffspring(selectedIndividual2, selectedIndividual1);
    //                 nextPopulation = concat(offspring, nextPopulation);
    //             } else {
    //                 nextPopulation = concat([selectedIndividual1, selectedIndividual2], nextPopulation);
    //             }
    //         }


    //         if (nextPopulation.filter(({fitness}) => population[0].fitness === fitness).length > POPULATION_SIZE/2) {
    //             population = [population[0], ...generateInitialPopulation(POPULATION_SIZE - 1)];
    //         } else {
    //             const sortedPopulation = nextPopulation.sort(byFitness);
    //             if (population[0].fitness < sortedPopulation[0].fitness ) {
    //                 onNewGeneration({...nextPopulation[0], generation: i + 1});
    //             }
    //             population = sortedPopulation;
    //         }


    //         }, 0)
    //     }

    //     resolve('DONE');
    // });
};
