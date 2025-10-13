import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
    static createJob(crontime: CronTime, onTick: OnTick): CronJob {
        //  const job = new CronJob(
        //     '*/2 * * * * *', // cronTime
        //     function () {
        //         console.log('You will see this message every two second');
        //     }, // onTick
        //     null, // onComplete
        //     true, // start
        //     'America/Los_Angeles' // timeZone
        // );
        const job = new CronJob(crontime, onTick);
        job.start();
        return job;

    }
}