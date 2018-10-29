// Fisher–Yates shuffle
export const shuffle = (array) => {
    let arrayCopy = Array.from(array);
    let counter = arrayCopy.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = arrayCopy[counter];
        arrayCopy[counter] = arrayCopy[index];
        arrayCopy[index] = temp;
    }
    return arrayCopy;
}

export const generateRandomBinaryArray = (length) => {
    return Array.from({ length }, () => Math.round(Math.random()))
};

export const swapMutation = (chromosome) => {
    let mutatedChromosome = chromosome;

    const index1 = Math.floor(Math.random() * mutatedChromosome.length);
    const index2 = Math.floor(Math.random() * mutatedChromosome.length);

    let temp1 = mutatedChromosome[index1];

    mutatedChromosome[index1] = mutatedChromosome[index2];
    mutatedChromosome[index2] = temp1;

    return mutatedChromosome;
};

export const pmxCrossover = (ind1, ind2) => {
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