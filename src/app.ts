import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { version } from './config';
import { makeRouteHandler } from './routes/makeRouteHandler';
import { testHttpStatusCodeRouteHandler } from './routes/testHttpStatusCodeRouteHandler';
import { aboutRouteHandler } from './routes/aboutRouteHandler';
import { testRouteHandler } from './routes/test/testTouteHandler';

export function createApp(): { app: express.Application; server: http.Server } {
    const app = express();

    app.use(json());
    app.use(cors());

    const server = http.createServer(app);

    app.use((err: any, req: any, res: any, next: any) => {
        console.error(err);
    });

    app.get('/', aboutRouteHandler);
    app.get('/test', testRouteHandler);
    app.get('/test/httpStatusCode/:statusCode', testHttpStatusCodeRouteHandler);

    app.get('/make', makeRouteHandler);

    return {
        app,
        server,
    };
}
