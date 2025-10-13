import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/checks-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)

const emailService = new EmailService();
export class Server {
    //Para poder usar el método y el método sin instanciar la clase: Server.start();
    public static start() {
        console.log('Server started...');

        //todo: Mandar mailing
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(
            ['erika.diana.vidal@gmail.com']
        )

        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(
        //     ['erika.diana.vidal@gmail.com']
        // )

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'http://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //         // new CheckService().execute('http://localhost:3000')
        //     }
        // );
    }
}