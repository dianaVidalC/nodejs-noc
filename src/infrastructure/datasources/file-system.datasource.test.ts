import fs from 'fs';

import path from "path"
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('FileSystemDatasource', () => {
    const logPath = path.join(__dirname, '../../../logs');
    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    })

    test('should create log files if they do not exists', () => {
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);

        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
    })

    test('should save a log in all-logs.log', () => {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.low
        })

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toBe('');
        expect(highLogs).toBe('');
    })

    test('should save a log in logs-all.log and logs-medium.log', () => {
        //Vuelve a crear los archivos porque se borra la carpeta logs luego de cada prueba
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.medium
        })

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
        expect(highLogs).toBe('');
    })

    test('should save a log in logs-all.log and logs-high.log', () => {
        //Vuelve a crear los archivos porque se borra la carpeta logs luego de cada prueba
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.high
        })

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toBe('');
        expect(highLogs).toContain(JSON.stringify(log));
    })

    test('should return all logs', async () => {
        //Vuelve a crear los archivos porque se borra la carpeta logs luego de cada prueba
        const logDatasource = new FileSystemDatasource();

        const logLow = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message-low',
            level: LogSeverityLevel.low
        })
        const logMedium = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message-medium',
            level: LogSeverityLevel.medium
        })
        const logHigh = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message-high',
            level: LogSeverityLevel.high
        })

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    })

    test('should not throw an error if path exits', async () => {
        new FileSystemDatasource();
        new FileSystemDatasource();

        expect(true).toBe(true);
    })

    test('should throw an error if severity level is not defined', async () => {
        //Vuelve a crear los archivos porque se borra la carpeta logs luego de cada prueba
        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'HIGH' as LogSeverityLevel;

        try {
            await logDatasource.getLogs(customSeverityLevel);
            expect(true).toBe(false);
        } catch (error) {
            const errorString = `${customSeverityLevel} not implemented`;
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', errorString);
            expect(errorString).toContain(errorString);
        }
    })
})