import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('CheckServiceMultiple UseCase', () => {

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }


    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }



    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }


    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3],
        successCallback,
        errorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch returns true', async () => {
        const wasOk = await checkServiceMultiple.execute('https://google.com');

        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();//Espera que sea llamado
        expect(errorCallback).not.toHaveBeenCalled();// Espera que no sea llamado

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should call errorCallback when fetch returns false', async () => {
        const wasOk = await checkServiceMultiple.execute('https://dsfasdfasdf.com');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();//Espera que no sea llamado
        expect(errorCallback).toHaveBeenCalled();// Espera que sea llamado

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

})