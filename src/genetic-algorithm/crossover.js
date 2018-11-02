import {concat, splitAt} from "ramda";
import {random} from "./random";

export const onePointCrossover = (chromosome1, chromosome2) => {
    const point = Math.floor(random() * (chromosome1.length - 1));

    const [chromosome1_front, chromosome1_back] = splitAt(point, chromosome1);
    const [chromosome2_front, chromosome2_back] = splitAt(point, chromosome2);

    return [concat(chromosome1_front, chromosome2_back), concat(chromosome2_front, chromosome1_back)];
};