import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import connectDB, { disconnectDB } from '../../src/db/mongodb.js';

let mongoServer = MongoMemoryServer;

describe('MongoDB Connection', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URL = mongoServer.getUri();
    process.env.DB_NAME = 'testDB';
  });

  afterAll(async () => {
    await disconnectDB();
    await mongoServer.stop();
  });

  it('should connect to the database', async () => {
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });

  it('should disconnect from the database', async () => {
    await connectDB();
    await disconnectDB();
    expect(mongoose.connection.readyState).toBe(0); // 0 means disconnected
  });
});



