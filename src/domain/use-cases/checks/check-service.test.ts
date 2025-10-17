import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service"

describe('CheckService UseCase', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch returns true', async () => {
        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();//Espera que sea llamado
        expect(errorCallback).not.toHaveBeenCalled();// Espera que no sea llamado

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should call errorCallback when fetch returns false', async () => {
        const wasOk = await checkService.execute('https://dsfasdfasdf.com');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();//Espera que no sea llamado
        expect(errorCallback).toHaveBeenCalled();// Espera que sea llamado

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

})