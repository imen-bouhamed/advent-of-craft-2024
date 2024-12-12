import { Logger } from "./logger";

export class Reindeer {
    constructor(
        public readonly reindeerName: string,
        public readonly currentLocation: string,
        public readonly numbersOfDaysForComingBack: number) {
    }
}
export class SantaCommunicator {
    private readonly numberOfDaysToRest: number;
    private readonly numberOfDayBeforeChristmas: number;

    constructor(numberOfDaysToRest: number, numberOfDayBeforeChristmas: number) {
        this.numberOfDaysToRest = numberOfDaysToRest;
        this.numberOfDayBeforeChristmas = numberOfDayBeforeChristmas;
    }

    public composeMessage(reindeer: Reindeer, numberOfDaysBeforeChristmas: number): string {
        const daysBeforeReturn = this.daysBeforeReturn(reindeer.numbersOfDaysForComingBack, numberOfDaysBeforeChristmas);
        return `Dear ${reindeer.reindeerName}, please return from ${reindeer.currentLocation} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`;
    }

    public isOverdue(reindeer: Reindeer, numberOfDaysBeforeChristmas: number, logger: Logger): boolean {
        if (this.daysBeforeReturn(reindeer.numbersOfDaysForComingBack, numberOfDaysBeforeChristmas) <= 0) {
            logger.log(`Overdue for ${reindeer.reindeerName} located ${reindeer.currentLocation}.`);
            return true;
        }
        return false;
    }

    private daysBeforeReturn(numbersOfDaysForComingBack: number, numberOfDaysBeforeChristmas: number): number {
        return numberOfDaysBeforeChristmas - numbersOfDaysForComingBack - this.numberOfDaysToRest;
    }
}
