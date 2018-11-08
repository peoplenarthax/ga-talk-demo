import { times, concat } from 'ramda';
import seedrandom from 'seedrandom';
import { tournament } from "./selection";
import {generateRandomBinaryArray} from './utils'
import {flipMutation} from "./mutation";
import {onePointCrossover} from "./crossover";
import {addFitness} from "./fitness";
const rng = seedrandom('its time for a real random number you know..., or31 maybe... ', { entropy: true });

const byFitness = (indA, indB) => indB.fitness - indA.fitness;

const POPULATION_SIZE = 100;
const GENERATIONS = 999;
const MUTATION_PROB = 0.4;
const CROSSOVER_PROB = 0.8;
const TOURNAMENT_SIZE = 5;

let objects;
// TODO: Create prototype so setters and getters go there
export const setObjects = (newObjects) => {
    objects = newObjects;
}

export const getObjects = () => {
    return objects;
}
const generateRandomIndividual = () => {
    const chromosome = generateRandomBinaryArray(getObjects().length)  ;
    return addFitness(chromosome, getObjects())
};

const generateInitialPopulation = (numberOfIndividuals, ) => {
    return times(() => generateRandomIndividual(), numberOfIndividuals)
            .sort(byFitness);
};

const generateIndividualFromChromosome = (chromosome) => {
    return addFitness(chromosome, getObjects());
};

const generateOffspring = (individual1, individual2) => {
    const offspring = onePointCrossover(individual1.chromosome, individual2.chromosome);

    return offspring.map(individual => {
        const individualToTransform = rng() < MUTATION_PROB
            ? flipMutation(individual)
            : individual;

        return generateIndividualFromChromosome(individualToTransform);
    });
};

export const startGA = ({ best }) => {
    return new Promise((resolve) => {
        const initialPopulation = generateInitialPopulation(POPULATION_SIZE, objects);
        let population = Array.from(initialPopulation);
        for (let i = 0; i < GENERATIONS; i++) {
            // TODO: Better handling async
            setTimeout(() => {
            console.log(`${i} generation/ BEST INDIVIDUAL: `, population[0]);
            let nextPopulation = [population[0], population[1]];
            while (nextPopulation.length !== initialPopulation.length) {
                const [selectedIndividual1, selectedIndividual2] = tournament(2, population, { tournamentSize: TOURNAMENT_SIZE, removeWinners: true });

                if (rng() < CROSSOVER_PROB) {
                    const offspring = generateOffspring(selectedIndividual2, selectedIndividual1);
                    nextPopulation = concat(offspring, nextPopulation);
                } else {
                    nextPopulation = concat([selectedIndividual1, selectedIndividual2], nextPopulation);
                }
            }


            if (nextPopulation.filter(({fitness}) => population[0].fitness === fitness).length > POPULATION_SIZE/2) {
                population = [population[0], ...generateInitialPopulation(POPULATION_SIZE - 1)];
            } else {
                const sortedPopulation = nextPopulation.sort(byFitness);
                if (population[0].fitness < sortedPopulation[0].fitness ) {
                    console.log('CALLING THIS METHOD');
                    best({...nextPopulation[0], generation: i + 1});
                }
                population = sortedPopulation;
            }


            }, 0)
        }

        resolve('DONE');
    });
};
