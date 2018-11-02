import {compose, range, reduce, remove} from "ramda";
import {random} from "./random";

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
                ...population[Math.round(random() * (population.length - 1))],
                index,
            }))
        .reduce((winner, ind) => (ind.fitness > winner.fitness ? ind : winner), { fitness: 0 });

export function tournament(amount, population, { tournamentSize = 2, removeWinners } = {}) {
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