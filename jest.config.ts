import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
};
