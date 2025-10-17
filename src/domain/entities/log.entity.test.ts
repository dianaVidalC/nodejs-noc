import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('logEntity', () => {
    const dataObj = {
        level: LogSeverityLevel.low,
        message: 'test-message',
        createdAt: new Date(),
        origin: 'log.entity.test.ts',
    };

    test('should create a LogEntity instance', () => {


        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    })

    test('should create a LogEntity instance from json', () => {
        const json = `{
            "message": "test-message",
            "level": "low",
            "createdAt": "2023-08-11T16:01:59.508Z",
            "origin": "log.entity.test.ts"
        }`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('test-message');
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.createdAt).toBeInstanceOf(Date);
    })

    test('should create a LogEntity instance from object', () => {
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    })
})