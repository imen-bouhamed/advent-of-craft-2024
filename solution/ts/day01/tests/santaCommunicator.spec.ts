import { Configuration } from "../src/configuration";
import { Reindeer } from "../src/reindeer";
import { SantaCommunicator } from "../src/santaCommunicator";
import { TestLogger } from "./doubles/testLogger";

const SantaCommunicatorSpec = 'Dasher';
const NORTH_POLE = 'North Pole';
const numberOfDaysToRest = 2;
const numberOfDayBeforeChristmas = 24;

describe('SantaCommunicator', () => {
    let communicator: SantaCommunicator;
    let logger: TestLogger;
    let configuration: Configuration;

    beforeEach(() => {
        configuration = new Configuration(numberOfDaysToRest, numberOfDayBeforeChristmas);
        communicator = new SantaCommunicator(configuration);
        logger = new TestLogger();
    });

    test('composeMessage', () => {
        const reindeer = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, 5);
        const message = communicator.composeMessage(reindeer);
        expect(message).toEqual('Dear Dasher, please return from North Pole in 17 day(s) to be ready and rest before Christmas.');
    });

    test('shouldDetectOverdueReindeer', () => {
        const reindeer = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, numberOfDayBeforeChristmas);
        const overdue = communicator.isOverdue(reindeer, logger);

        expect(overdue).toBeTruthy();
        expect(logger.getLog()).toEqual('Overdue for Dasher located North Pole.');
    });

    test('shouldReturnFalseWhenNoOverdue', () => {
        const reindeer = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, numberOfDayBeforeChristmas - numberOfDaysToRest - 1);
        const overdue = communicator.isOverdue(reindeer, logger);
        expect(overdue).toBeFalsy();
    });
});
