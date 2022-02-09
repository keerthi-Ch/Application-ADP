const assert = require('assert');
const {
    addition, subtraction, multiplication, division, remainder,
} = require('../src/operations');

describe('Perform Operations', () => {
    it('Should resolve Additions correctly', () => {
        const right = Number.MAX_SAFE_INTEGER - 1;
        const left = 1;
        const result = addition(left, right);
        assert.strictEqual(result, Number.MAX_SAFE_INTEGER);
    });

    it('Should resolve Subtractions correctly', () => {
        const right = Number.MAX_SAFE_INTEGER;
        const left = 1;
        const result = subtraction(left, right);
        assert.strictEqual(result, (-Number.MAX_SAFE_INTEGER) + 1);
    });

    it('Should resolve Multiplications correctly', () => {
        const right = Number.MAX_SAFE_INTEGER / 2;
        const left = 2;
        const result = multiplication(left, right);
        assert.strictEqual(result, Number.MAX_SAFE_INTEGER);
    });

    it('Should resolve Divisions correctly', () => {
        const right = Number.MAX_SAFE_INTEGER;
        const left = Number.MAX_SAFE_INTEGER;
        const result = division(left, right);
        assert.strictEqual(result, 1);
    });

    it('Should resolve Remainders correctly', () => {
        const right = Number.MAX_SAFE_INTEGER;
        const left = Number.MAX_SAFE_INTEGER;
        const result = remainder(left, right);
        assert.strictEqual(result, 0);
    });
});
