import { CronService } from "./cron-service";

describe('CronService', () => {
    const mockOnTick = jest.fn();

    test('should create a job', (done) => {
        const job = CronService.createJob('* * * * * *', mockOnTick);

        setTimeout(() => {
            expect(mockOnTick).toHaveBeenCalledTimes(1);
            job.stop();
            done();
        }, 1000)
    });
});