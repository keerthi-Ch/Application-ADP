const https = require('https');
const {
    protocol, server, getTaskPath, submitTaskPath,
} = require('./serviceConfig.js');
/**
 * Returns a task from Task Server
 * @returns a Promise resolving the task otherwise rejecting.
 */
module.exports.getTask = () => new Promise((resolve, reject) => {
    const req = https.get(`${protocol}${server}${getTaskPath}`, (res) => {
        if (res.statusCode === 200) {
            res.on('data', (chunk) => {
                try {
                    resolve(JSON.parse(chunk));
                } catch (e) {
                    reject(new Error('Invalid response from server'));
                }
            });
        } else {
            reject(new Error('Unknown error from server'));
        }
    });
    req.on('error', (error) => {
        reject(error);
    });
});

/**
 * Submits a task to Task Validation Server
 * @param id the Task ID
 * @param result the calculated result
 * @returns a Promise resolving the task validation status and result, rejecting otherwise.
 */
module.exports.submitTask = (id, result) => new Promise((resolve, reject) => {
    const postData = JSON.stringify({
        id,
        result,
    });

    // Build request options for POST
    const options = {
        hostname: server,
        port: 443,
        path: submitTaskPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(postData),
        },
    };

    // Creates the ClientRequest
    const req = https.request(options, (postRes) => {
        // Validates Status and return a human-readable string
        let status = 'Unknown';
        if (postRes.statusCode === 200) {
            status = 'Success';
        } else if (postRes.statusCode === 400) {
            status = 'Incorrect value in result; no ID specified; value is invalid';
        } else if (postRes.statusCode === 500) {
            status = 'ID cannot be found';
        } else {
            reject(new Error('Unknown error from server'));
        }
        resolve({ status, result });
    });

    // Error treatment
    req.on('error', (error) => {
        reject(error);
    });

    // Send post data
    req.write(postData);
    req.end();
});
