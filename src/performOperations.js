const { getTask, submitTask } = require('./main.js');
const {
    addition, subtraction, multiplication, division, remainder,
} = require('./operations.js');

class performOperations {
    /**
    * Calls a specific operation based on **operation**
    * @param {} operation the desired operation
    * @param {*} left left value
    * @param {*} right right value
    */
    static performingOperation(operation, left, right) {
        if (operation === 'addition') {
            return addition(left, right);
        }
        if (operation === 'subtraction') {
            return subtraction(left, right);
        }
        if (operation === 'multiplication') {
            return multiplication(left, right);
        }
        if (operation === 'division') {
            return division(left, right);
        }
        if (operation === 'remainder') {
            return remainder(left, right);
        }
        return null;
    }


    static run() {
        return new Promise((resolve) => {
            let currentTask = {};
            getTask().then((task) => {
                currentTask = task;
                const {
                    id, operation, left, right,
                } = task;
                const result = performOperations.performingOperation(operation, left, right);
                return submitTask(id, result);
            }).then((data) => {
                const {
                    id, operation, left, right,
                } = currentTask;
                resolve({
                    id, operation, left, right, result: data.result, status: data.status,
                });
            }).catch((error) => {
                resolve({
                    status: error.message,
                });
            });
        });
    }
}

module.exports = performOperations;
