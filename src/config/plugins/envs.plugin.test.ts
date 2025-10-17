import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {
    test('should return envs options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'noc.test@google.com',
            MAILER_SECRET_KEY: '1234567',
            PROD: false,
            MONGO_URL: 'mongodb://erika:123456789@127.0.0.1:27017/NOC-TEST?authSource=admin',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'erika',
            MONGO_PASS: '123456789'
        })
    })
    test('should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';
        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    })
});