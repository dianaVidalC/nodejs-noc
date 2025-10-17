import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('Pruebas en MongoLogDatasource', () => {
    const logDataSource = new MongoLogDatasource();

    const log = new LogEntity({
        origin: 'mongo-log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.medium,
    })


    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    });

    afterEach(async () => {
        await LogModel.deleteMany();
    })

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should create a log', async () => {
        //Para motivo de pruebas se validará el log, pero no es buena práctica
        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Mongo Log created:', expect.any(String));
    })

    test('should get logs', async () => {
        await logDataSource.saveLog(log);
        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    })
})