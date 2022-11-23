export const randomizer = (minNumber: number, maxNumber: number): number =>
    Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));