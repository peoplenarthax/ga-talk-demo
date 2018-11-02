import {update} from "ramda";
import {random} from "./random";

export const flipMutation = (chromosome) => {
    const flipIndex = Math.round(random() * (chromosome.length - 1));
    return update(flipIndex, !chromosome[flipIndex], chromosome)
};