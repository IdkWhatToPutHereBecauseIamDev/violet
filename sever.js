import express from 'express';
import { createServer } from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import { path64 } from 'file-64';
import { join } from 'node:path';

const __dirname = path64(import.meta.url).dirname;
const bare = createBareServer('/bare/');
const app = express();
const server = createServer();

// Serve the static browser files
app.use(express.static(join(__dirname, 'public')));

app.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

app.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

const PORT = process.env.PORT || 8080;
server.on('request', (req, res) => app(req, res));
server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
    else socket.end();
});

server.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
});
