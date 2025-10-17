import mongoose from "mongoose";
import { MongoDatabase } from "./init";
import { envs } from "../../config/plugins/envs.plugin";

describe('init MongoDB', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    })

    test('should connect to MongoDB', async () => {
        console.log(process.env.MONGO_URL, process.env.MONGO_DB_NAME);
        
        const connected = await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!,
        });
        expect(connected).toBe(true);
    })

    test('should throw an error if connection fails', async () => {
        try {
            const connected = await MongoDatabase.connect({
                mongoUrl: 'http://erika@localhost:27017',
                dbName: process.env.MONGO_DB_NAME!,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    })
})