import { OBJECTS, KNAPSACK } from './knapsack'
import {generateRandomBinaryArray} from './utils'
import { times, concat, splitAt, remove, contains, update } from 'ramda';

function getTotalWeightAndValue(individual) {
    return individual.reduce(({weight, value}, val) =>
        ({ weight: weight + OBJECTS[val].weight, value: value + OBJECTS[val].value})
    , {weight: 0, value: 0});
}

function addFitness(chromosome) {
    let includedObjectsIndex = chromosome.reduce((acc, val, ind) => val ?
        [...acc, ind]
        : acc
    , []);
    const objectsIncluded = includedObjectsIndex.length;

    let totalWeightAndValue = getTotalWeightAndValue(includedObjectsIndex);
    while (totalWeightAndValue.weight > KNAPSACK.size) {
        const indexToRemove = Math.floor(Math.random() * includedObjectsIndex.length);
        const { weight, value } = OBJECTS[includedObjectsIndex[indexToRemove]];

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


const byFitness = (indA, indB) => indB.fitness - indA.fitness;

function tournament(population, amount) {
    const participants = times(() => {
        const index = Math.round(Math.random() * (population.length - 1))

        if (index < 0 || index > 99) { throw new Error() }
        return population[index]
    }, amount
    );

    if (!participants.sort(byFitness)[0]) { throw new Error()}
    return participants.sort(byFitness)[0];
}

const POPULATION_SIZE = 100;
const GENERATIONS = 9999;
const MUTATION_PROB = 0.05;
const CROSSOVER_PROB = 0.8;
const TOURNAMENT_SIZE = 5;

const generateRandomIndividual = () => {
    const chromosome = generateRandomBinaryArray(OBJECTS.length)  ;
    return addFitness(chromosome)
};

const generateInitialPopulation = () => {
    return times(() => generateRandomIndividual(), POPULATION_SIZE)
            .sort(byFitness);
};

const generateIndividualFromChromosome = (chromosome) => {
    return addFitness(chromosome);
};

const onePointCrossover = (chromosome1, chromosome2) => {
    const point = Math.floor(Math.random() * (chromosome1.length - 1));

    const [chromosome1_front, chromosome1_back] = splitAt(point, chromosome1);
    const [chromosome2_front, chromosome2_back] = splitAt(point, chromosome2);

    return [concat(chromosome1_front, chromosome2_back), concat(chromosome2_front, chromosome1_back)];
};

const flipMutation = (chromosome) => {
    const flipIndex = Math.round(Math.random() * (chromosome.length - 1));
    return update(flipIndex, !chromosome[flipIndex], chromosome)
};

const generateOffspring = (individual1, individual2) => {
    const offspring = onePointCrossover(individual1.chromosome, individual2.chromosome);

    return offspring.map(individual => {
        const individualToTransform = Math.random() < MUTATION_PROB
            ? flipMutation(individual)
            : individual;

        return generateIndividualFromChromosome(individualToTransform);
    });
};

export const startGA = ({ onNewGeneration}) => {
    const initialPopulation = generateInitialPopulation();
    let population = Array.from(initialPopulation);

    console.log(population);
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
