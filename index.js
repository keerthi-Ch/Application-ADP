const http = require('http');
const fs = require('fs');
const { Subject } = require('rxjs');
const { takeWhile } = require('rxjs/operators');
const Perform = require('./src/performOperations');

const port = process.argv[2] || 4000;
const calculationPerform = new Subject();
const indexData = fs.readFileSync('index.html');

// Return a calculation every 1 second and emit the result to the subject
setInterval(() => {
    Perform.run().then((data) => {
        calculationPerform.next(data);
    });
}, 1000);

/**
 * Create the server
 * There are two separated 'routes":
 * * '/events' for the EventSource
 * * '/ ' or fallback to serve a index.html file
 */
const server = http.createServer((req, res) => {
    // if the URL match '/events' serve the EventSource performing a calculation every 500ms.
    if (req.url.match(/\/events/)) {
        let connectionOpen = true;
        // Preparing request and response to serve as a event-stream
        req.socket.setNoDelay(true);
        // Checks when the connection is closed
        req.socket.on('close', () => {
            connectionOpen = false;
        });
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
        });

        // Subscribe to a calculationPerform while the connection is open
        // and send data to the event-stream
        calculationPerform.pipe(
            takeWhile(() => connectionOpen),
        ).subscribe((data) => {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        });
    } else {
        // Serve an ordinary HTML file.
        res.writeHead(200);
        res.end(indexData);
    }
});

server.listen(port);
// eslint-disable-next-line no-console
console.log(`Http server listening on http://localhost:${port}`);
