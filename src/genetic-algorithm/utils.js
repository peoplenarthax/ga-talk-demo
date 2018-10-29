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