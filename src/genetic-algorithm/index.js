import { FINAL_MAP, POINTS } from './tspGraph'
import { shuffle } from './utils'
import { times, concat, splitAt } from 'ramda';

function calcFitness(individual) {
    let totalDistance = FINAL_MAP['A'][individual[0]];

    for(let i = 0; i < individual.length; i++) {
        if ( (i + 1) < individual.length) {
            totalDistance += FINAL_MAP[individual[i]][individual[i+1]];
        } else {
            totalDistance += FINAL_MAP[individual[i]]['A'];
        }
    }

    return totalDistance;
}

const byFitness = (indA, indB) => indA.fitness - indB.fitness;

function tournament(population, amount) {
    const participants = times(() => population[Math.round(Math.random() * population.length)], amount);

    return participants.sort(byFitness)[0];
}

const POPULATION_SIZE = 100;
const GENERATIONS = 9999;
const MUTATION_PROB = 0.05;
const CROSSOVER_PROB = 0.8;
const TOURNAMENT_SIZE = 5;

const generateRandomIndividual = () => {
    const chromosome = shuffle(POINTS)  ;
    return { chromosome, fitness: calcFitness(chromosome)  }
};

const generateInitialPopulation = () => {
    return times(() => generateRandomIndividual(), POPULATION_SIZE)
            .sort(byFitness);
};

function generateIndividualFromChromosome(chromosome) {
    return {
        chromosome,
        fitness: calcFitness(chromosome)
    }
}

const swapMutation = (chromosome) => {
    let mutatedChromosome = chromosome;

    const index1 = Math.floor(Math.random() * mutatedChromosome.length);
    const index2 = Math.floor(Math.random() * mutatedChromosome.length);

    let temp1 = mutatedChromosome[index1];
    if (temp1 === undefined) {
        throw new Error();
    }
    mutatedChromosome[index1] = mutatedChromosome[index2];
    mutatedChromosome[index2] = temp1;

    return mutatedChromosome;
};

const pmxCrossover = (ind1, ind2) => {
    let _map1 = {};
    let _map2 = {};

    const point1 = Math.floor(Math.random() * (ind1.length - 1));
    const point2 = point1 + Math.floor(Math.random() * (ind1.length - point1));

    let offspring = [Array.from(ind1), Array.from(ind2)];

    for (let i = point1; i < point2; i++) {
        offspring[0][i] = ind2[i];
        _map1[ind2[i]] = ind1[i];

        offspring[1][i] = ind1[i];
        _map2[ind1[i]] = ind2[i];
    }

    for (let i = 0; i < point1; i++) {
        while (offspring[0][i] in _map1) {
            offspring[0][i] = _map1[offspring[0][i]];
        }
        while (offspring[1][i] in _map2) {
            offspring[1][i] = _map2[offspring[1][i]];
        }
    }

    for (let i = point2; i < ind1.length; i++) {
        while (offspring[0][i] in _map1) {
            offspring[0][i] = _map1[offspring[0][i]];
        }
        while (offspring[1][i] in _map2) {
            offspring[1][i] = _map2[offspring[1][i]];
        }
    }
    return offspring;
};

const generateOffspring = (individual1, individual2) => {
    const offspring = pmxCrossover(individual1.chromosome, individual2.chromosome);

    return offspring.map(individual => {
        const individualToTransform = Math.random() < MUTATION_PROB
            ? swapMutation(individual)
            : individual;

        return generateIndividualFromChromosome(individualToTransform);
    });
};

export const startGA = ({ onNewGeneration}) => {
    const initialPopulation = generateInitialPopulation();
    let population = Array.from(initialPopulation);
    for (let i = 0; i < GENERATIONS; i++) {

        console.log(`${i} generation/ BEST INDIVIDUAL: `, population[0]);
        console.log(population);
        let nextPopulation = [population[0], population[1]];
        while (nextPopulation.length !== initialPopulation.length) {
            const selectedIndividual1 = tournament(population, 2);
            const selectedIndividual2 = tournament(population, 2);

            if (Math.random() > CROSSOVER_PROB) {
                const offspring = generateOffspring(selectedIndividual2, selectedIndividual1);

                nextPopulation = concat(offspring, nextPopulation);
            } else {
                nextPopulation = concat([selectedIndividual1, selectedIndividual2], nextPopulation);
            }
        }

        population = nextPopulation.sort(byFitness);
    }

};
