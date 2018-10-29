import { OBJECTS, KNAPSACK } from './knapsack'
import {generateRandomBinaryArray} from './utils'
import { times, concat, splitAt, remove, contains, update, compose, range, reduce } from 'ramda';
import seedrandom from 'seedrandom';

const rng = seedrandom('its time for a real random number you know..., or31 maybe... ', { entropy: true });
console.log(rng());
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
        const indexToRemove = Math.floor(rng() * includedObjectsIndex.length);
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

const selectAndRemoveWinners = (removeWinners, population, selected) =>
    ({ index, ...selectedIndividual }) => ({
        selected: [...selected, selectedIndividual],
        availablePopulation: removeWinners
            ? remove(index, 1, population)
            : population,
    });

const tournamentOf = tournamentSize => population =>
    Array(tournamentSize)
        .fill()
        .map((participant, index) =>
            ({
                ...population[Math.round(rng() * (population.length - 1))],
                index,
            }))
        .reduce((winner, ind) => (ind.fitness > winner.fitness ? ind : winner), { fitness: 0 });

function tournament(amount, population, { tournamentSize = 2, removeWinners } = {}) {
    const { selected: selectedIndividuals } = reduce(
        ({ selected, availablePopulation }) =>
            compose(
                selectAndRemoveWinners(removeWinners, availablePopulation, selected),
                tournamentOf(tournamentSize),
            )(availablePopulation)
        ,
        { selected: [], availablePopulation: population },
        range(0, amount),
    );

    return selectedIndividuals;
}

const POPULATION_SIZE = 100;
const GENERATIONS = 9999;
const MUTATION_PROB = 0.4;
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
    const point = Math.floor(rng() * (chromosome1.length - 1));

    const [chromosome1_front, chromosome1_back] = splitAt(point, chromosome1);
    const [chromosome2_front, chromosome2_back] = splitAt(point, chromosome2);

    return [concat(chromosome1_front, chromosome2_back), concat(chromosome2_front, chromosome1_back)];
};

const flipMutation = (chromosome) => {
    const flipIndex = Math.round(rng() * (chromosome.length - 1));
    return update(flipIndex, !chromosome[flipIndex], chromosome)
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

export const startGA = ({ onNewGeneration}) => {
    const initialPopulation = generateInitialPopulation();
    let population = Array.from(initialPopulation);

    for (let i = 0; i < GENERATIONS; i++) {
        let crossOver = 0
        console.log(`${i} generation/ BEST INDIVIDUAL: `, population[0]);
        // console.log(population);
        let nextPopulation = [population[0], population[1]];
        while (nextPopulation.length !== initialPopulation.length) {
            const [selectedIndividual1, selectedIndividual2] = tournament(2, population, { tournamentSize: 4, removeWinners: true });

            if (rng() < CROSSOVER_PROB) {
                const offspring = generateOffspring(selectedIndividual2, selectedIndividual1);
                crossOver += 2;
                nextPopulation = concat(offspring, nextPopulation);
            } else {
                nextPopulation = concat([selectedIndividual1, selectedIndividual2], nextPopulation);
            }
        }

        population = nextPopulation.sort(byFitness);
    }

};
