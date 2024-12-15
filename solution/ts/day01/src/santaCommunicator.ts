import { Configuration } from "./configuration";
import { Logger } from "./logger";
import { Reindeer } from "./reindeer";

export class SantaCommunicator {
    private readonly configuration: Configuration

    constructor(configuration: Configuration) {
        this.configuration = configuration;
    }

    public composeMessage(reindeer: Reindeer): string {
        const daysBeforeReturn = this.daysBeforeReturn(reindeer.numbersOfDaysForComingBack, this.configuration.numberOfDayBeforeChristmas);
        return `Dear ${reindeer.reindeerName}, please return from ${reindeer.currentLocation} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`;
    }

    public isOverdue(reindeer: Reindeer, logger: Logger): boolean {
        if (this.daysBeforeReturn(reindeer.numbersOfDaysForComingBack, this.configuration.numberOfDayBeforeChristmas) <= 0) {
            logger.log(`Overdue for ${reindeer.reindeerName} located ${reindeer.currentLocation}.`);
            return true;
        }
        return false;
    }

    private daysBeforeReturn(numbersOfDaysForComingBack: number, numberOfDaysBeforeChristmas: number): number {
        return numberOfDaysBeforeChristmas - numbersOfDaysForComingBack - this.configuration.numberOfDaysToRest;
    }
}
