const nock = require('nock');
const assert = require('assert');
const {
    protocol, server, getTaskPath, submitTaskPath,
} = require('../src/serviceConfig.js');
const Perform = require('../src/performOperations');

describe('Testing Perform methods', () => {
    describe('Operations', () => {
        it('Should resolve an Addition', () => {
            const value = Perform.performOperation('addition', 1, 2);
            assert.strictEqual(value, 3);
        });

        it('Should resolve a Subtraction', () => {
            const value = Perform.performOperation('subtraction', 1, 2);
            assert.strictEqual(value, -1);
        });

        it('Should resolve a Multiplication', () => {
            const value = Perform.performOperation('multiplication', 1, 2);
            assert.strictEqual(value, 2);
        });

        it('Should resolve a Division', () => {
            const value = Perform.performOperation('division', 1, 2);
            assert.strictEqual(value, 0.5);
        });

        it('Should resolve a Remainder', () => {
            const value = Perform.performOperation('remainder', 1, 2);
            assert.strictEqual(value, 1);
        });
    });

    describe('Validate Addition', () => {
        it('Should validate a correct addition', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'addition', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: 3 })
                .reply(200);

            Perform.performOperation = () => 1 + 2;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'addition');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 3);
            assert.strictEqual(data.status, 'Success');
        });

        it('Should fail in an incorrect addition', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'addition', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: 4 })
                .reply(400);

            Perform.performOperation = () => 1 + 2 + 1;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'addition');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 4);
            assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
        });
    });

    describe('Validate Subtraction', () => {
        it('Should validate a correct subtraction', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'subtraction', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: -1 })
                .reply(200);

            Perform.performOperation = () => 1 - 2;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'subtraction');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, -1);
            assert.strictEqual(data.status, 'Success');
        });

        it('Should fail in an incorrect subtraction', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'subtraction', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: -2 })
                .reply(400);

            Perform.performOperation = () => 1 - 2 - 1;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'subtraction');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, -2);
            assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
        });
    });

    describe('Validate Multiplication', () => {
        it('Should validate a correct multiplication', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'multiplication', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: 2 })
                .reply(200);

            Perform.performOperation = () => 2;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'multiplication');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 2);
            assert.strictEqual(data.status, 'Success');
        });

        it('Should fail in an incorrect multiplication', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'multiplication', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: 6 })
                .reply(400);

            Perform.performOperation = () => 1 * 2 * 3;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'multiplication');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 6);
            assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
        });
    });

    describe('Validate Division', () => {
        it('Should validate a correct division', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'division', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: 0.5 })
                .reply(200);

            Perform.performOperation = () => 1 / 2;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'division');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 0.5);
            assert.strictEqual(data.status, 'Success');
        });

        it('Should fail in an incorrect division', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'division', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: 1.5 })
                .reply(400);

            Perform.performOperation = () => 1 / 2 + 1;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'division');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 1.5);
            assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
        });
    });

    describe('Validate Remainder', () => {
        it('Should validate a correct remainder', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'remainder', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: 1 })
                .reply(200);

            Perform.performOperation = () => 1 % 2;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'remainder');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 1);
            assert.strictEqual(data.status, 'Success');
        });

        it('Should fail in an incorrect remainder', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 123, operation: 'remainder', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 123, result: 2 })
                .reply(400);

            Perform.performOperation = () => (1 % 2) + 1;
            const data = await Perform.run();
            assert.strictEqual(data.id, 123);
            assert.strictEqual(data.operation, 'remainder');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 2);
            assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
        });
    });

    describe('Value not found for ID', () => {
        it('Should fail when ID cannot be found', async () => {
            nock(`${protocol}${server}`)
                .get(getTaskPath)
                .reply(200, {
                    id: 999, operation: 'addition', left: 1, right: 2,
                });

            nock(`${protocol}${server}`)
                .post(submitTaskPath, { id: 999, result: 3 })
                .reply(500);

            Perform.performOperation = () => 1 + 2;
            const data = await Perform.run();
            assert.strictEqual(data.id, 999);
            assert.strictEqual(data.operation, 'addition');
            assert.strictEqual(data.left, 1);
            assert.strictEqual(data.right, 2);
            assert.strictEqual(data.result, 3);
            assert.strictEqual(data.status, 'ID cannot be found');
        });
    });


});
