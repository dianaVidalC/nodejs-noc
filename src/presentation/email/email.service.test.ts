import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from 'nodemailer';

describe('EmailService', () => {
    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    const emailService = new EmailService();

    test('should send email', async () => {
        const options: SendMailOptions = {
            to: 'erika.diana.vidal@gmail.com',
            subject: 'Test',
            htmlBody: `h1>Test</h1>`,
        }
        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: options.htmlBody,
            subject: options.subject,
            to: options.to
        });
    })
    test('should send email with attachements', async () => {

        const email = 'erika.diana.vidal@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ]),
        });
    })
})