import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendLogEmailUseCase {
    execute(to: string | string[]): Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly fileSystemLogRepository: LogRepository
    ) { }

    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

            if (!sent) {
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Log Email sent`,
                origin: 'send-email-logs.ts',
            })
            this.fileSystemLogRepository.saveLog(log);
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'send-email-logs.ts',
            })
            this.fileSystemLogRepository.saveLog(log);
            return false;
        }
        return true;
    }
}